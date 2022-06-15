import Mail from '../lib/Mail';

export default {
  key: 'RegistrationMailer',
  optiions: {
    delay: 5000,
    priority: 3,
  },
  async handle({ data }) {
    const {
      cliente: { nome, email, url },
    } = data;

    await Mail.sendMail({
      from: 'Portal das Escolas <dlinecode@gmail.com>',
      to: `${nome} <${email}>`,
      subject: 'Solicitação de cadastro de instituição',
      html: `Olá ${nome}!  Click no link para continuar com o cadastro da tua instituição!${url}`,
    });
  },
};
