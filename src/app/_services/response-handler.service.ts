import { Injectable } from '@angular/core';
import { HttpClient, HttpXsrfTokenExtractor, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ResponseHandlerService {
  
    _base_path = '//ec2-18-216-81-87.us-east-2.compute.amazonaws.com/api';
   
    // _base_path = '127.0.0.1:8000/api';

    _url = this._base_path + '/login';
    _url1 = this._base_path + '/closed';
    _url2 = this._base_path + '/contacts';
    create_contact = this._base_path + '/create-contact';
    contact = this._base_path + '/contact';
    services = this._base_path + '/services';
    create_service = this._base_path + '/services';
    create_lead = this._base_path + '/deal';
    getLead = this._base_path + '/deal';
    create_opportunity = this._base_path + '/opportunity';
    getOpportunity_url = this._base_path + '/opportunity';
    opportunityDetailPage = this._base_path + '/opportunity';
    loginVarify_url = this._base_path + '/varify';


    constructor(private _http: HttpClient) { }

    ///// login varify 

    loginVarify(){
      const auth_token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+auth_token
      });
      return this._http.get<any>(this.loginVarify_url,{ headers: headers });
    }


    login(userData) {
        return this._http.post<any>(this._url, userData);
    }
    loggedIn(){
      // console.log(localStorage.getItem('token'));
      // !! return true or false if token exists return true else  false 
      return !!localStorage.getItem('token')
    }
    getToken(){
      const auth_token = localStorage.getItem ('token');
  
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+auth_token
      })
      return this._http.get<any>(this._url1, { headers: headers } );
    }
    getContactDetails(){
      const auth_token = localStorage.getItem ('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+auth_token
      })
      return this._http.get<any>(this._url2, { headers: headers } );
  
    }


    createContact(contactData){
      const auth_token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+auth_token
      });
      return this._http.post<any>(this.create_contact,contactData,{ headers: headers });
    }

    getContactDetail(id){
      const auth_token = localStorage.getItem ('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+auth_token
      });
      return this._http.get<any>(this.contact+'/'+id,{ headers: headers });
  
    }

    getLeadDetails(){
      const auth_token = localStorage.getItem ('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+auth_token
      });
      return this._http.get<any>(this.getLead,{ headers: headers });
    }


    getServices(){
      const auth_token = localStorage.getItem ('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+auth_token
      });
      return this._http.get<any>(this.services,{ headers: headers });
    }
    createServices(serviceValues){
      const auth_token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+auth_token
      });
      return this._http.post<any>(this.create_service,serviceValues,{ headers: headers });
    }

    createLead(leadValue){
      const auth_token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+auth_token
      });
      return this._http.post<any>(this.create_lead,leadValue,{ headers: headers });
    }

    createOpportunity(opportunityValue){
      const auth_token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+auth_token
      });
      return this._http.post<any>(this.create_opportunity,opportunityValue,{ headers: headers });
    }
    getOpportunity(){
      const auth_token = localStorage.getItem ('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+auth_token
      });
      return this._http.get<any>(this.getOpportunity_url,{ headers: headers });
    }

    getOpportunityDetail(id){
      const auth_token = localStorage.getItem ('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+auth_token
      });
      return this._http.get<any>(this.opportunityDetailPage+'/'+id,{ headers: headers });
  
    }


    checkLoggedIn(){
      // !! return true or false if token exists return true else  false 
      return !!localStorage.getItem('token')
    }

  

}
