generateFrame();
generateHeader(doc);

// Frame generation process
function generateFrame() {
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
// Draw the first row
function row1(doc, height) {
	doc.lineJoin('miter').rect(30, height, 550, 85).stroke();
	return doc;
}

// Money formatting function
function para(number, fractionDigits = 2) { // MONEY FORMAT (Turkish Lira)
	return number.toFixed(fractionDigits).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ₺';
}
// Generate the header section of the report
generateHeader(doc=> {
	const logoLeft = 'assets/images/logo_left.png'; // LEFT LOGO
	const logoRight = 'assets/images/logo_right.png'; // RIGHT LOGO
	doc.image(logoLeft, 20, 50, { width: 60, height: 80 }); // LEFT LOGO LOCATION
	doc.image(logoRight, 500, 50, { width: 60, height: 80 }); // RIGHT LOGO LOCATION
	doc.fontSize(12).text('T.C', 100, 30, { align: 'center' }); // TITLEs
	doc.text('SAMSUN METROPOLITAN MUNICIPALITY', 100, 50, { align: 'center' });
	doc.text('SAMSUN WATER AND SEWERAGE ADMINISTRATION', 100, 70, { align: 'center' });
	doc.text('INFORMATION TECHNOLOGY DIRECTORATE', 100, 90, { align: 'center' });
	doc.fontSize(16).text('Progress Report', 100, 150, { align: 'center' });
	doc.moveDown();
})
c
// Fetch data from the database(MySQL)
connection.query('SELECT * FROM progress_report ORDER BY id DESC LIMIT 1 ', (error, results) => {
	if (error) {
		console.error('MySQL query error: ', error);
		return;
	}

	// Print data to the PDF
	results.forEach((row) => {
		doc
			.fontSize(12)
			.text(`Date: ${row.date}`, 100, 180, { align: 'center' })
			.text(`No: ${row.number}`, 100, 200, { align: 'center' })
			.text(`Application Year: ${row.application_year}`, 100, 220, { align: 'center' });

		doc
			.text('Name of the Work / Service:', 35, 270)
			.text(`${row.work_name}`, 275, 270, { align: 'left' })

			.text('Study / Project Number of the Work / Service:', 35, 330)
			.text(`${row.project_number}`, 275, 330, { align: 'left' })

			.text('Name / Trade Name of the Contractor:', 35, 370)
			.text(`${row.contractor_name}`, 275, 370, { align: 'left' })

			.text('Contract Amount:', 35, 420)
			.text(`${para(row.contract_amount)}`, 275, 420, { align: 'left' })

			.text('Date of Tender:', 35, 440)
			.text(`${row.tender_date}`, 275, 440, { align: 'left' })

			.text('Registration Number:', 35, 460)
			.text(`${row.registration_number}`, 275, 460, { align: 'left' })

			.text('Contract Date:', 35, 480)
			.text(`${row.contract_date}`, 275, 480, { align: 'left' })

			.text('Workplace Delivery Date:', 35, 500)
			.text(`${row.workplace_delivery_date}`, 275, 500, { align: 'left' })

			.text('Work Period According to the Contract:', 35, 520)
			.text(`${row.work_period}`, 275, 520, { align: 'left' })

			.text('Contract Completion Date:', 35, 540)
			.text(`${row.contract_completion_date}`, 275, 540, { align: 'left' });

		doc.moveDown();

		// --------------BOTTOM TABLE------------- //
		doc 
			.lineCap('butt')
			.moveTo(135, 580)
			.lineTo(135, 665)
			.stroke()
			.lineCap('butt')
			.moveTo(600, 580)
			.lineTo(600, 665)
			.stroke()
			.lineCap('butt')
			.moveTo(405, 580)
			.lineTo(405, 665)
			.stroke()
			.lineCap('butt')
			.moveTo(30, 615)
			.lineTo(580, 615)
			.stroke();

		row1(doc, 580);

		doc
			.text('Contract Amount', 35, 590)
			.text(`${para(row.contract_amount)}`, 40, 630, { align: 'left' })
			.text('Contract Increase', 175, 580)
			.text('Approval Date / Number', 155, 592)
			.text('Additional Contract Amount', 295, 590)
			.text('Total Contract Amount', 435, 580)
			.text(`${para(row.contract_amount)}`, 435, 630, { align: 'left' });
		/*----------------------------------------------*/
		doc
			.lineCap('butt')
			.moveTo(175, 670)
			.lineTo(175, 755)
			.stroke()
			.lineCap('butt')
			.moveTo(600, 670)
			.lineTo(600, 755)
			.stroke()
			.lineCap('butt')
			.moveTo(385, 670)
			.lineTo(385, 755)
			.stroke()
			.lineCap('butt')
			.moveTo(30, 700)
			.lineTo(580, 700)
			.stroke();

		row1(doc, 670);

		doc
			.text('Time Extension Decision Date', 35, 675)
			.text('Number', 205, 675)
			.text('Granted Time', 305, 675)
			.text('Work Completion Date', 435, 675);
	});

	// Complete the PDF writing process
	doc.end();

	// Notify that the progress report has been successfully generated
	console.log('Progress report has been successfully generated');

	// Download the PDF file
	res.setHeader('Content-Type', 'application/pdf');
	res.setHeader('Content-Disposition', 'attachment; filename=progress_report.pdf');

	doc.pipe(res);
});