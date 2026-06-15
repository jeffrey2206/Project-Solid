/**
 * MailerService — Responsabilidad: notificaciones por correo electrónico
 *
 * Principio SRP aplicado: esta clase tiene UNA sola razón para cambiar,
 * y es cuando cambia la lógica o el proveedor de envío de correos.
 * No sabe nada de productos ni de persistencia.
 */
export class MailerService {
  /**
   * Envía una notificación por correo electrónico a un cliente de la Reserva.
   * @param recipientEmail - Dirección de correo del destinatario.
   * @param message - Cuerpo del mensaje a enviar.
   */
  sendNotification(recipientEmail: string, message: string): void {
    console.log(`[MailerService] Enviando correo a <${recipientEmail}>: "${message}"`);
    // Aquí iría la integración con un proveedor real (SendGrid, SES, etc.)
  }
}
