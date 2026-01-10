import useTranslate from "@/hooks/useTranslate";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Layout from "@/layouts/webapp/layout";
import profileSheet from "@/translateSheets/profileSheet";
import AvatarFallback from "@/components/avatarfallback";
import { usePage } from "@inertiajs/react";
import { User } from "@/types";

export default function Profile() {
    const user = usePage<{ auth: { user: User } }>().props.auth.user;
    const { translate } = useTranslate(profileSheet, "pt");

    return (
        <Layout title="Perfil">
            <div className="max-w-xl mx-auto p-4 space-y-8">
                <div className="grid place-items-center">
                    {user.avatar
                        ? <img className="h-28 w-28 overflow-hidden rounded-full" src={user.avatar} alt={user.name} />
                        : <AvatarFallback className="h-28 w-28 fill-white" />
                    }
                    <p className="text-sm">{translate("Clique para alterar")}</p>
                </div>

                <div className="p-4 border rounded shadow">
                    <h2 className="font-semibold">{translate("Senha")}</h2>

                    <div className="mt-4">
                        <Label>{translate("Atual")}:
                            <Input type="password" placeholder="*****" />
                        </Label>
                        <Label>{translate("Nova")}:
                            <Input type="password" placeholder="*****" />
                        </Label>

                        <Button className="mt-4 w-full">{translate("Salvar")}</Button>
                    </div>
                </div>

                <Button className="w-full bg-trasparent text-red-700 border border-red-700">{translate("Sair")}</Button>
            </div>
        </Layout>
    );
}
