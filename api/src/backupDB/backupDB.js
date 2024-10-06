const { exec } = require("child_process");
const cron = require("node-cron");
const moment = require("moment");
const path = require("path");

// Función para realizar el respaldo de la base de datos
const backupDatabase = () => {
  const date = moment().format("YYYY-MM-DD_HH-mm-ss"); // Formato para la fecha
  const backupFile = path.join("/mnt/data", `backup_${date}.sql`);

  // Comando para realizar el backup
  const command = `PGPASSWORD=${process.env.PGPASSWORD} pg_dump --host=${
    process.env.PGHOST
  } --port=${process.env.PGPORT} --username=${
    process.env.PGUSER
  } --no-password --verbose --file=${backupFile} --format=custom ${
    process.env.POSTGRES_DB || process.env.PGDATABASE
  }`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error en el respaldo: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Error en el respaldo: ${stderr}`);
      return;
    }
    console.log(`Respaldo realizado correctamente: ${stdout}`);
  });
};

// Programa el cron job para que se ejecute todos los días a las 12:00
cron.schedule("0 12 * * *", () => {
  console.log("Iniciando respaldo de la base de datos...");
  backupDatabase();
});

module.exports = backupDatabase;
