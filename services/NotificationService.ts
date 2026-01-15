
export interface EmailTemplate {
  subject: string;
  body: string;
  recipient: string;
}

class NotificationService {
  private static signature = `
    <br><br>
    <div style="border-top: 1px solid #EAD2A0; padding-top: 20px; font-family: sans-serif;">
      <p style="margin: 0; color: #1A1A1A; font-weight: 900; letter-spacing: 2px;">BUSINESS PARAGUANÁ</p>
      <p style="margin: 5px 0; color: #C5A059; font-size: 10px; font-weight: 700; text-transform: uppercase;">Tu Aliado Estratégico en la Región</p>
      <p style="margin: 15px 0; color: #7A0F12; font-size: 11px;">Punto Fijo, Estado Falcón, Venezuela.</p>
    </div>
  `;

  static generateWelcomeEmail(userName: string, email: string): EmailTemplate {
    return {
      recipient: email,
      subject: "Bienvenido a la Exclusividad: Business Paraguaná",
      body: `
        <div style="background-color: #F9F7F2; padding: 40px; font-family: serif;">
          <h1 style="color: #1A1A1A; font-size: 24px; border-bottom: 2px solid #A11B20; padding-bottom: 10px;">Estimado/a ${userName},</h1>
          <p style="color: #4A4A4A; line-height: 1.6; font-size: 16px;">
            Es un honor para nosotros darle la bienvenida a <b>Business Paraguaná</b>. 
            Su perfil ha sido verificado bajo los más altos estándares de seguridad.
          </p>
          <p style="color: #4A4A4A; line-height: 1.6;">
            A partir de ahora, usted cuenta con un acceso privilegiado a nuestra red de negocios, 
            mercado virtual de activos y asesoría legal de alto nivel.
          </p>
          <div style="background-color: #A11B20; color: white; padding: 20px; border-radius: 15px; margin: 30px 0; text-align: center;">
            <p style="margin: 0; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Su viaje hacia el éxito comienza aquí.</p>
          </div>
          ${this.signature}
        </div>
      `
    };
  }

  static generateStatusUpdateEmail(userName: string, email: string, requestTitle: string, newStatus: string, comment: string): EmailTemplate {
    return {
      recipient: email,
      subject: `Actualización de Solicitud: ${requestTitle}`,
      body: `
        <div style="background-color: #F9F7F2; padding: 40px; font-family: sans-serif;">
          <h2 style="color: #1A1A1A;">Hola ${userName},</h2>
          <p style="color: #4A4A4A;">Su trámite <b>"${requestTitle}"</b> ha sido actualizado por su asesor asignado.</p>
          
          <div style="border-left: 4px solid #C5A059; padding-left: 20px; margin: 30px 0;">
            <p style="margin: 0; font-weight: bold; color: #C5A059; text-transform: uppercase; font-size: 12px;">Nuevo Estado:</p>
            <p style="margin: 5px 0; font-size: 18px; font-weight: 800; color: #1A1A1A;">${newStatus}</p>
            
            <p style="margin: 15px 0 0 0; font-weight: bold; color: #C5A059; text-transform: uppercase; font-size: 12px;">Comentario del Asesor:</p>
            <p style="margin: 5px 0; font-style: italic; color: #4A4A4A;">"${comment}"</p>
          </div>
          
          <p style="color: #4A4A4A;">Puede revisar el historial completo y subir documentos adicionales directamente desde la aplicación.</p>
          ${this.signature}
        </div>
      `
    };
  }

  static generateInvitationEmail(userName: string, email: string): EmailTemplate {
    return {
      recipient: email,
      subject: "Oportunidades de Inversión en Paraguaná - Corte de la Semana",
      body: `
        <div style="background-color: #121212; color: white; padding: 40px; font-family: serif;">
          <h2 style="color: #EAD2A0; border-bottom: 1px solid #EAD2A0; padding-bottom: 10px;">Oportunidades Ejecutivas</h2>
          <p style="color: #E8E2D9; font-size: 14px;">Estimado aliado ${userName},</p>
          <p style="color: #E8E2D9;">Hemos seleccionado activos exclusivos que podrían interesarle basados en su perfil de inversión:</p>
          
          <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 15px; background: rgba(255,255,255,0.05); padding: 15px; border-radius: 10px;">
              <b style="color: #EAD2A0;">• Propiedad Comercial:</b> Local de 200m² en Av. Jacinto Lara.
            </li>
            <li style="margin-bottom: 15px; background: rgba(255,255,255,0.05); padding: 15px; border-radius: 10px;">
              <b style="color: #EAD2A0;">• Vehículo Premium:</b> Blindado nivel 3 disponible para entrega inmediata.
            </li>
          </ul>
          
          <p style="color: #C5A059; font-weight: bold;">Acceda a su panel para ver los detalles técnicos y agendar una visita.</p>
          ${this.signature}
        </div>
      `
    };
  }

  static sendSimulatedEmail(template: EmailTemplate) {
    console.log("%c--- SIMULACIÓN DE ENVÍO DE CORREO ---", "color: #A11B20; font-weight: bold;");
    console.log(`Para: ${template.recipient}`);
    console.log(`Asunto: ${template.subject}`);
    console.log("Cuerpo HTML generado:");
    console.log(template.body);
    console.log("%c---------------------------------------", "color: #A11B20; font-weight: bold;");
    
    // Disparar evento global para que la UI reaccione si es necesario
    const event = new CustomEvent('email-sent', { detail: template });
    window.dispatchEvent(event);
  }
}

export default NotificationService;
