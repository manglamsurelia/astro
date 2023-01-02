import { Component, OnInit } from '@angular/core';
import { jsPDF } from "jspdf";
import html2PDF from 'jspdf-html2canvas';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  address: any = "1000 Johnnie Dodds Blvd. Ste. 103-310 Mt. Pleasant, SC 29464 CustomerService@Life365Portraits.com www.Life365Portraits.com"
  clientAdd: any = 'Shalvi Kashyap 5555 Long Beach Blvd APT 122 LONG BEACH, CA 90805 jayantkumar99@gmail.com'
  invoiceNum: any = 101236785;
  invoiceDate: any = '02/01/2023';
  sessionNum: any = 2755301;
  appDelData: any = '02/01/2023';
  clientNum: any = 112334456;
  salesRep: any = 'McLaurin, Daniel (Sales)';
  phone: any = '(720) 256-1210';
  notesDiv: any = '1 - Storyteller Digital Package';
  paymentDate: any = '02/01/2023';
  method: any = 'Visa (2983)';
  // amount: any = 1000;

  subTotal: any = 3000;
  salesTax: any = 400;
  shipping: any = 0;
  innTotal: any = this.subTotal + this.salesTax + this.shipping;
  totalPayment: any = this.subTotal + this.salesTax + this.shipping;
  balanceDue: any = 0;
  disInclude: any = 20;
  invoiceNotes:any = 'We ask our valued customers to please note:   Every order is    unique and requires custom production. This process is initiated as soon as you place your order.  For this reason we are unable to accept cancellations and ALL SALES ARE FINAL.  If there is an error or mistake in your order we will gladly correct it at no cost to you.  If you have any questions please contact our customer service department at 1-800-322-2974.  Thank you!';

  constructor() { }

  ngOnInit(): void {
  }

  keyMethod(e) {
    this.innTotal = parseFloat(e.target.textContent) + this.salesTax + this.shipping;
    this.totalPayment = parseFloat(e.target.textContent) + this.salesTax + this.shipping;
  }

  keyMethod1(e) {
    this.innTotal = parseFloat(e.target.textContent) + this.subTotal + this.shipping;
    this.totalPayment = parseFloat(e.target.textContent) + this.subTotal + this.shipping;
  }

  keyMethod2(e) {
    this.innTotal = parseFloat(e.target.textContent) + this.subTotal + this.salesTax;
    this.totalPayment = parseFloat(e.target.textContent) + this.subTotal + this.salesTax;
  }

  download() {
    try {

      let idd = document.getElementById('invoice')
      // const doc = new jsPDF();

      // doc.html(`<h1>hhh</h1>`);
      // doc.save("a4.pdf");

      html2PDF(idd, {
        jsPDF: {
          format: 'a4',
        },
        imageType: 'image/jpeg',
        output: './invoice/invoice.pdf'
      });

    } catch (e) { }
  }
}
