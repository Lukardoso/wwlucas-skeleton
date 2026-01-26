// Components
import { login } from '@/routes';
import { email } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import useTranslate from '@/hooks/useTranslate';
import loginSheet from '@/translateSheets/loginSheet';

export default function ForgotPassword({ status }: { status?: string }) {
    const { translate } = useTranslate(loginSheet);

    return (
        <AuthLayout
            title={translate("Esqueceu sua senha?")}
            description={translate("Forneça seu email para recuperar sua senha.")}
        >
            <Head title={translate("Esqueceu sua senha?")} />

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <div className="space-y-6">
                <Form {...email.form()}>
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="email">{translate("Endereço de email")}</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="off"
                                    autoFocus
                                    placeholder={translate("email@exemplo.com.br")}
                                />

                                <InputError message={translate(errors.email)} />
                            </div>

                            <div className="my-6 flex items-center justify-start">
                                <Button
                                    className="w-full"
                                    disabled={processing}
                                    data-test="email-password-reset-link-button"
                                >
                                    {processing && (
                                        <LoaderCircle className="h-4 w-4 animate-spin" />
                                    )}

                                    {translate("Enviar link de redefinição de senha")}
                                </Button>
                            </div>
                        </>
                    )}
                </Form>

                <div className="space-x-1 text-center text-sm text-muted-foreground">
                    <span>{translate('ou retorne para')}</span>
                    <TextLink href={login()} className='text-primary'>login</TextLink>
                </div>
            </div>
        </AuthLayout>
    );
}
