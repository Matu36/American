const mailsMasivos = (cuerpoMensaje, pdf, imagen, imagen1) => {
  const americanVialImage =
    "https://res.cloudinary.com/dmfzplfra/image/upload/v1727536957/Images/american_ftok3h.png"; // URL de la imagen de American Vial

  return `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f9f9f9;
          padding: 20px;
        }
        .email-container {
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          padding: 20px;
        }
        h1 {
          color: #333333;
        }
        p {
          color: #555555;
          font-size: 16px;
        }
        .footer {
          margin-top: 20px;
          font-size: 12px;
          color: #999999;
        }
        .product-image {
          width: 150px;
          height: auto;
          display: block;
          margin: 10px auto;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <h1>Mensaje Importante</h1>
        <p>${cuerpoMensaje}</p>
        
        ${imagen ? `<img src="${imagen}" alt="Imagen" class="product-image" />` : ""}
        ${imagen1 ? `<img src="${imagen1}" alt="Imagen Adicional" class="product-image" />` : ""}

        <img src="${americanVialImage}" alt="American Vial" style="width: 150px; height: auto; display: block; margin: 20px auto;" />
        
        ${pdf ? `<a href="${pdf}" target="_blank" style="display: block; margin: 20px auto; font-weight: bold;">Ver Documento PDF</a>` : ""}
        
        <p style="text-align: center; margin: 10px 0; font-weight: bold;">
          Paris 256 esq. Colectora Este <br />
          1611 - Don Torcuato - Bs. As.<br />
          Tel./Fax : (+54) 11 4748 5900 / int. 273
        </p>
        
        <a href="http://www.americanvial.com" style="text-align: center; display: block; margin-bottom: 20px; font-weight: bold;">www.americanvial.com</a>
      </div>
    </body>
  </html>
  `;
};

module.exports = mailsMasivos;
