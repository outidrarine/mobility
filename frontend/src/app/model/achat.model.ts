export interface Achat{
  id:string;
  objet:string;
  prix:number;
  userid:string;
  usermail:string;
  valide:boolean|undefined;
  justifId:string;

}

export interface PageAchat{
  achats: Achat[];
  page: number;
  size:number;
  totalPages:number;
}
