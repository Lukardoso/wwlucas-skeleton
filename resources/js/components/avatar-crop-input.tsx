import React, { useState, useCallback } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { User as UserIcon, Loader2 } from 'lucide-react';
import useTranslate from '@/hooks/useTranslate';
import profileSheet from '@/translateSheets/profileSheet';
import Button from '@/button';
import { router, usePage } from '@inertiajs/react';
import { User } from '@/types';
import AvatarController from '@/actions/App/Http/Controllers/AvatarController';
import { Label } from './ui/label';

export function AvatarCropInput({ defaultImage }: { defaultImage?: string|null }) {
    const user = usePage<{ auth: { user: User } }>().props.auth.user;
    const { translate } = useTranslate(profileSheet);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [finalFile, setFinalFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.addEventListener('load', () => setImageSrc(reader.result as string));
            reader.readAsDataURL(file);
        }
    };

    const onCropComplete = useCallback((_: Area, pixels: Area) => {
        setCroppedAreaPixels(pixels);
    }, []);

    const createCropImage = async () => {

        if (!imageSrc || !croppedAreaPixels) return;
        setIsLoading(true);

        const img = new Image();
        img.src = imageSrc;
        await new Promise((res) => (img.onload = res));

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;

        ctx?.drawImage(
            img,
            croppedAreaPixels.x,
            croppedAreaPixels.y,
            croppedAreaPixels.width,
            croppedAreaPixels.height,
            0,
            0,
            croppedAreaPixels.width,
            croppedAreaPixels.height
        );

        canvas.toBlob((blob) => {
            if (blob) {
                const file = new File([blob], "avatar.jpg", { type: "image/jpeg" });
                setFinalFile(file);

                router.put(AvatarController.update(user.id), { avatar: file }, { preserveState: false });
            }
            setIsLoading(false);
        }, 'image/jpeg');
    };

    const resetSelection = () => {
        setImageSrc(null);
        setFinalFile(null);
        setCroppedAreaPixels(null);
        setIsLoading(false);
    }

    if (finalFile) {
        return (
            <div onClick={resetSelection} className="flex flex-col items-center text-center">
                <img
                    src={URL.createObjectURL(finalFile)}
                    alt="Preview"
                    className="w-36 h-36 rounded-full object-cover border-2 border-grey-300 border-dashed hover:border-brand hover:p-1 transition-all duration-300"
                />

                <input type="hidden" name="avatar" value={finalFile.name} />

                <p className="mt-2 text-sm">
                    {translate("Clique para alterar")}
                </p>
            </div>
        );
    }

    if (imageSrc) {
        return (
            <div className="flex flex-col items-center space-y-6">
                <div className="relative w-80 h-80 shadow-lg">
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        cropShape="round"
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                    />
                </div>

                <div>
                    <Label className='flex gap-4 items-center px-4 py-2 rounded border shadow-lg'>
                        Zoom:
                        <input
                            type="range"
                            min={1}
                            max={3}
                            step={0.1}
                            value={zoom}
                            onChange={(e) => setZoom(parseFloat(e.target.value))}
                            className='accent-brand'
                        />
                    </Label>
                </div>

                <Button
                    onClick={createCropImage}
                    disabled={isLoading}
                    className='w-full shadow-lg'
                >
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : translate("Salvar")}
                </Button>
            </div>
        );
    }

    return (
        <div>
            <label
                htmlFor="avatar-upload"
                className="flex flex-col items-center justify-center w-36 h-36 rounded-full bg-gray-100 cursor-pointer border-2 border-dashed border-gray-300 hover:border-brand transition duration-300 overflow-hidden"
            >
                <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    className="hidden"
                />
                {defaultImage
                    ? <img src={defaultImage} alt="Avatar" className=" text-gray-400 object-cover" />
                    : <UserIcon className="w-20 h-20 text-gray-400" />
                }
            </label>

            <p className="mt-2 text-sm text-center">
                {translate("Clique para alterar")}
            </p>
        </div>
    );
};