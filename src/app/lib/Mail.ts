import nodemailer from 'nodemailer'
import mailerConfig from '../../config/mail';

export default nodemailer.createTransport(mailerConfig)