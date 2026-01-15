import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailData {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async ({ to, subject, html }: EmailData) => {
  try {
    const data = await resend.emails.send({
      from: 'Où sortir à Lisbonne <contact@ousortiralisbonne.com>',
      to: [to],
      subject,
      html
    });

    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
};

export const sendBookingConfirmation = async (booking: any) => {
  const html = `
    <h1>Confirmation de réservation - Où sortir à Lisbonne</h1>
    <p>Bonjour ${booking.name},</p>
    <p>Nous avons bien reçu votre réservation pour ${booking.activity}.</p>
    <p><strong>Détails de la réservation :</strong></p>
    <ul>
      <li>Date : ${booking.date}</li>
      <li>Heure : ${booking.time}</li>
      <li>Nombre de personnes : ${booking.guests}</li>
    </ul>
    <p>Notre équipe vous contactera dans les plus brefs délais pour confirmer votre réservation.</p>
    <p>Merci de votre confiance !</p>
    <p>L'équipe Où sortir à Lisbonne</p>
  `;

  return sendEmail({
    to: booking.email,
    subject: 'Confirmation de réservation - Où sortir à Lisbonne',
    html
  });
};

export const sendContactConfirmation = async (contact: any) => {
  const html = `
    <h1>Confirmation de message - Où sortir à Lisbonne</h1>
    <p>Bonjour ${contact.name},</p>
    <p>Nous avons bien reçu votre message.</p>
    <p>Notre équipe vous répondra dans les plus brefs délais.</p>
    <p>Merci de votre intérêt !</p>
    <p>L'équipe Où sortir à Lisbonne</p>
  `;

  return sendEmail({
    to: contact.email,
    subject: 'Confirmation de message - Où sortir à Lisbonne',
    html
  });
};

export const sendNewsletterConfirmation = async (email: string) => {
  const html = `
    <h1>Bienvenue dans la newsletter Où sortir à Lisbonne !</h1>
    <p>Merci de vous être inscrit à notre newsletter.</p>
    <p>Vous recevrez régulièrement nos meilleures offres et actualités sur Lisbonne.</p>
    <p>À très bientôt !</p>
    <p>L'équipe Où sortir à Lisbonne</p>
  `;

  return sendEmail({
    to: email,
    subject: 'Bienvenue dans la newsletter Où sortir à Lisbonne !',
    html
  });
};