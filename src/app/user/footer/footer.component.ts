import { Component, OnInit } from '@angular/core';
import { FooterData } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  facebookLink = FooterData.socialMediaLinks.facebook;
  twitterLink = FooterData.socialMediaLinks.twitter;
  instragramLink = FooterData.socialMediaLinks.instagram;
  linkedinLink = FooterData.socialMediaLinks.linkedin;
  mailUs = FooterData.socialMediaLinks.mailTo;
  telephone = FooterData.socialMediaLinks.telephone;
  redirectMapUrl = FooterData.socialMediaLinks.redirectMap;

  constructor() { }

  ngOnInit() {
  }

  redirectToMap(){
    window.open(FooterData.socialMediaLinks.redirectMap,"_blank");
  }

}
