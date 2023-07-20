const PDFDocument = require('pdfkit');
const express = require('express');
const mysql = require('mysql');
const app = express();

const connection = mysql.createConnection({
	host: 'host',
	user: 'userName',
	password: 'password',
	database: 'DBname',
});
connection.connect((error) => {
	if (error) throw error;
	else console.log('bağlanıldı!');
});

connection.query('SELECT * FROM progress-payment ORDER BY pp_id DESC LIMIT 1 ', (error, results) => {
	results.forEach((e) => {
		app.get('/generate-progress-payment', (req, res) => {
			const doc = new PDFDocument({ size: 'A4', margin: 30, font: 'Roboto.ttf' });
			reportFrame();
			reportHeader();
			reportInformation();
			reportTable();
			reportFooter();

			function reportFrame() {
				const frameX = 15; // X coordinate of the left edge of the frame
				const frameY = 30; // Y coordinate of the top edge of the frame
				const frameWidth = 570; // Width of the frame
				const frameHeight = 750; // Height of the frame
				const frameThickness = 2; // Thickness of the frame in pixels

				const drawRect = (x, y, width, height, color) => {
					doc.rect(x, y, width, height).fill(color);
				};

				drawRect(frameX, frameY, frameWidth, frameThickness, '#000000'); // Top frame
				drawRect(frameX, frameY + frameHeight - frameThickness, frameWidth, frameThickness, '#000000'); // Bottom frame
				drawRect(frameX, frameY + frameThickness, frameThickness, frameHeight - 2 * frameThickness, '#000000'); // Left frame
				drawRect(frameX + frameWidth - frameThickness, frameY + frameThickness, frameThickness, frameHeight - 2 * frameThickness, '#000000'); // Right frame
			}

			function rowReport(doc, height) {
				doc.lineJoin('miter').rect(30, height, 550, 85).stroke();
				return doc;
			}

			function para(number, fractionDigits = 2) {
				return number.toFixed(fractionDigits).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ₺';
			}


			function reportHeader() {
				const logoLeft = 'assets/images/logo_left.png';
				const logoRight = 'assets/images/logo_right.png';
				doc
					.image(logoLeft, 20, 50, { width: 60, height: 80 })
					.image(logoRight, 500, 50, { width: 60, height: 80 })
					.fontSize(12)
					.text('Republic of Turkey', 100, 30, { align: 'center' })
					.text('SAMSUN METROPOLITAN MUNICIPALITY', 100, 50, { align: 'center' })
					.text('SAMSUN WATER AND SEWERAGE ADMINISTRATION', 100, 70, { align: 'center' })
					.text('INFORMATION TECHNOLOGY DIRECTORATE', 100, 90, { align: 'center' })
					.fontSize(16)
					.text('Progress Payment Report', 100, 150, { align: 'center' })
					.moveDown();
			}

			function reportInformation() {
				doc
					.fontSize(12)
					.text(`Date: ${e.date}`, 100, 180, { align: 'center' })
					.text(`No: ${e.no}`, 100, 200, { align: 'center' })
					.text(`Application Year: ${e.application_year}`, 100, 220, { align: 'center' })
					.text('Name of the Work / Service:', 35, 270)
					.text(`${e.work_name}`, 275, 270, { align: 'left' })
					.text('Study / Project Number of the Work / Service:', 35, 330)
					.text(`${e.project_number}`, 275, 330, { align: 'left' })
					.text('Name / Trade Name of the Contractor:', 35, 370)
					.text(`${e.contractor_name}`, 275, 370, { align: 'left' })
					.text('Contract Amount:', 35, 420)
					.text(`${para(e.contract_amount)}`, 275, 420, { align: 'left' })
					.text('Date of Tender:', 35, 440)
					.text(`${e.tender_date}`, 275, 440, { align: 'left' })
					.text('Registration Number:', 35, 460)
					.text(`${e.registration_number}`, 275, 460, { align: 'left' })
					.text('Contract Date:', 35, 480)
					.text(`${e.contract_date}`, 275, 480, { align: 'left' })
					.text('Workplace Delivery Date:', 35, 500)
					.text(`${e.workplace_delivery_date}`, 275, 500, { align: 'left' })
					.text('Work Period According to the Contract:', 35, 520)
					.text(`${e.work_period}`, 275, 520, { align: 'left' })
					.text('Contract Completion Date:', 35, 540)
					.text(`${e.contract_completion_date}`, 275, 540, { align: 'left' })
					.moveDown();
			}

			function reportTable() {
				doc
					.lineCap('butt')
					.moveTo(135, 580)
					.lineTo(135, 665)
					.moveTo(600, 580)
					.lineTo(600, 665)
					.moveTo(405, 580)
					.lineTo(405, 665)
					.moveTo(30, 615)
					.lineTo(580, 615)
					.stroke();

				rowReport(doc, 580);

				doc
					.text('Contract Amount', 35, 590)
					.text(`${para(e.contract_amount)}`, 40, 630, { align: 'left' })
					.text('Contract Increase', 175, 580)
					.text('Approval Date / Number', 155, 592)
					.text('Additional Contract Amount', 295, 590)
					.text('Total Contract Amount', 435, 580)
					.text(`${para(e.contract_amount)}`, 435, 630, { align: 'left' });
			}

			function reportFooter() {
				doc
					.lineCap('butt')
					.moveTo(175, 670)
					.lineTo(175, 755)
					.moveTo(600, 670)
					.lineTo(600, 755)
					.moveTo(385, 670)
					.lineTo(385, 755)
					.moveTo(30, 700)
					.lineTo(580, 700)
					.stroke();

				rowReport(doc, 670);

				doc
					.text('Time Extension Decision Date', 35, 675)
					.text('Number', 205, 675)
					.text('Granted Time', 305, 675)
					.text('Work Completion Date', 435, 675);
			}

			doc.end();
			console.log('Progress payment reports generated successfully');
			res.setHeader('Content-Type', 'application/pdf');
			res.setHeader('Content-Disposition', 'attachment; filename=progress_payment_report.pdf');
			doc.pipe(res);
		});
	});
});

app.listen(PORT);