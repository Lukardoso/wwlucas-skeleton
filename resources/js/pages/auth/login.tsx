import InputError from '@/components/input-error';
import PasswordInput from '@/components/PasswordInput';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import useTranslate from '@/hooks/useTranslate';
import AuthLayout from '@/layouts/auth-layout';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import loginSheet from '@/translateSheets/loginSheet';
import { Form, Head } from '@inertiajs/react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { translate } = useTranslate(loginSheet);

    return (
        <AuthLayout
            title={translate("Entrar em sua conta")}
            description={translate("Forneça seus dados de acesso para continuar.")}
        >
            <Head title={translate("Entrar")} />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={0}
                                    autoComplete="email"
                                    placeholder={translate("email@exemplo.com")}
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">{translate("Senha")}</Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="ml-auto text-sm text-primary"
                                            tabIndex={0}
                                        >
                                            {translate("Esqueceu sua senha?")}
                                        </TextLink>
                                    )}
                                </div>

                                <div>
                                    <PasswordInput
                                        id="password"
                                        name="password"
                                        required
                                        autoComplete="current-password"
                                        placeholder={translate("Senha")}
                                    />
                                    <InputError message={errors.password} />
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    className="dark:bg-white"
                                    tabIndex={0}
                                />
                                <Label htmlFor="remember">{translate("Permanecer conectado")}</Label>
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 w-full"
                                tabIndex={0}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && <Spinner />}
                                {translate("Entrar")}
                            </Button>
                        </div>
                    </>
                )}
            </Form>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </AuthLayout>
    );
}
