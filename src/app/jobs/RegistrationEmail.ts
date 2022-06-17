import Mail from '../lib/Mail';

export default {
  key: 'RegistrationMailer',
  options: {
    delay: 5000,
    priority: 3,
  },
  async handle({ data }) {
    const {
      cliente: { nome, email, url },
    } = data;

    await Mail.sendMail({
      from: 'ORDENFA <ulundoantonio@gmail.com>',
      to: `${nome} <${email}>`,
      subject: ' Recuperacao de senha',
      html: `<h1>Olá ${nome}!<h1>
       click no link para continuar com a recuperacao de senha
      ${url}`
   });
  },
};