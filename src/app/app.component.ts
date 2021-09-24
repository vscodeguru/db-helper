import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  lang: 'sql' | 'csharp' = 'sql';
  SqlQuery: string = `"select ow.* from vendors v " +
  "inner join contract_service_property csp on csp.Vendor_ID = v.Vendor_ID " +
  "inner join properties prop on prop.Property_ID = csp.Property_ID " +
  "inner join owners ow on ow.Owner_ID = prop.Owner_ID " +
  "where v.Vendor_ID = @Vendor_ID " +
  "group by ow.Owner_ID, " +
  "    ow.Owner_Name, " +
  "    ow.Billing_Address, " +
  "    ow.Primary_POC, " +
  "    ow.Title, " +
  "    ow.Office_Phone, " +
  "    ow.Cell_Phone, " +
  "    ow.Email"`;
  Output: string = '';

  SqlToCSharp() {
    this.lang = 'csharp';
    let queryLines = this.SqlQuery.replace(';', '').split(/\r?\n/);
    let convertedQueryLines: string[] = [];
    queryLines.forEach((str, idx) => {
      let line = '';
      if (queryLines.length - 1 === idx) {
        line = `\t\t\t\"${str} \"; \n`;
      } else if (idx >= 1) {
        line = `\t\t\t\"${str} \" + \n`;
      } else {
        line = `\"${str} \" + \n`;
      }
      convertedQueryLines.push(line);
    });
    this.Output = `var sql = ${convertedQueryLines.join('')}`;
    console.log(this.Output);
  }

  CSharpToSQL() {
    this.lang = 'sql';
    this.Output = this.replaceAll(this.SqlQuery, '"', '');
    this.Output = this.replaceAll(this.Output, '+', '');
    this.Output = this.replaceAll(this.Output, ';', '');
    console.log(this.Output);
  }

  Reset() {
    this.SqlQuery = '';
    this.Output = '';
  }

  replaceAll(str, find, replace) {
    return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
  }
  escapeRegExp(string) {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }
}
