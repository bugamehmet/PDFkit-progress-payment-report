# PDFkit-progress-payment-reports
<img width="598" alt="Ekran Resmi 2023-07-20 11 22 46" src="https://github.com/bugamehmet/PDFkit-report-document-MySQL/assets/137213648/e2acfac7-b4e3-4ab6-8814-824068aef984">

# Progress Payment Report Generator

This is a Node.js application that generates a progress payment report in PDF format using the PDFKit library. The application fetches data from a MySQL database table named 'progress-payment' and generates a report based on the latest entry.

## Getting Started

To run the application, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies by running the following command in the project directory:
3. Create a MySQL database and configure the connection settings in the code (`connection` object in `index.js`).
4. Make sure you have the `Roboto.ttf` font file in the project directory or update the font path accordingly in the code.
5. Run the application using the following command:
6. Once the application is running, navigate to `http://localhost:PORT/generate-progress-payment` in your web browser to generate the progress payment report.

## Dependencies

The application uses the following Node.js libraries:

- PDFKit: A PDF generation library for Node.js.
- Express: A web application framework for Node.js.
- MySQL: A MySQL database driver for Node.js.

## Project Structure

- `index.js`: The main application file where the server is set up, and the PDF generation logic is implemented.
- `Roboto.ttf`: The font file used for the PDF document. Make sure to place the font file in the project directory.
- `assets`: This folder contains the images (e.g., logos) used in the report.

## Usage

1. Start the server by running `npm start` in the terminal.
2. Access the report generation route by navigating to `http://localhost:PORT/generate-progress-payment` in your web browser.
3. The application will fetch the latest data from the 'progress-payment' table and generate a PDF report.
4. The generated PDF report will be automatically downloaded to your device.

## Database Connection

Make sure to update the MySQL connection settings in the code to match your MySQL database configuration.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to contribute to the project or use it as a template for generating PDF reports from a MySQL database using Node.js and PDFKit.

For any questions or issues, please create an issue in the GitHub repository.


