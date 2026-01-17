import { Form, Link, usePage } from "@inertiajs/react";
import PasswordController from "@/actions/App/Http/Controllers/Settings/PasswordController";
import { User } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AvatarCropInput } from '@/components/avatar-crop-input';
import useTranslate from "@/hooks/useTranslate";
import Layout from "@/layouts/webapp/layout";
import profileSheet from "@/translateSheets/profileSheet";
import Button from "@/button";
import { logout } from "@/routes";
import AvatarController from "@/actions/App/Http/Controllers/AvatarController";

export default function Profile() {
    const { translate } = useTranslate(profileSheet);
    const user = usePage<{ auth: { user: User } }>().props.auth.user;

    return (
        <Layout title="Perfil">
            <div className="max-w-xl mx-auto p-4 space-y-4">
                <div className="grid place-items-center">
                    <AvatarCropInput defaultImage={AvatarController.show(user.id).url} />
                </div>


                <div className="p-4 border rounded shadow-lg">
                    <h2 className="font-semibold">{translate("Senha")}</h2>

                    <Form
                        action={PasswordController.update()}
                        resetOnSuccess
                        className="mt-4"
                    >
                        {({ processing, errors, wasSuccessful }) => (
                            <>
                                <Label>{translate("Atual")}:
                                    <Input
                                        required
                                        name="current_password"
                                        id="current_password"
                                        type="password"
                                        className={`${errors.current_password ? "border-alert" : ""}`} />
                                </Label>

                                <div className="mt-4">
                                    <Label>{translate("Nova")}:
                                        <Input
                                            required
                                            name="password"
                                            id="password"
                                            type="password"
                                            className={`${errors.password ? "border-alert" : ""}`}
                                        />
                                    </Label>

                                    <Label>{translate("Confirme a nova senha")}:
                                        <Input
                                            required
                                            name="password_confirmation"
                                            id="password_confirmation"
                                            type="password"
                                            className={`${errors.password ? "border-alert" : ""}`}
                                        />
                                    </Label>
                                </div>

                                {errors.current_password && <div className="mt-4 text-sm text-alert">{translate(errors.current_password)}</div>}

                                {(errors.password && !errors.current_password) && <div className="mt-4 text-sm text-alert">{translate(errors.password)}</div>}

                                {wasSuccessful && <div>{translate("Senha alterada com sucesso")}</div>}

                                <div className="grid gap-2">
                                    <Button disabled={processing} type="submit" className="mt-4">{translate("Mudar senha")}</Button>
                                </div>
                            </>
                        )}
                    </Form>

                    <Link
                        href={logout()}
                        className="w-full mt-4 px-2 py-1 border border-destructive rounded text-sm text-destructive hover:opacity-80 cursor-pointer">
                        {translate("Sair do aplicativo")}
                    </Link>
                </div>
            </div>
        </Layout>
    );
}