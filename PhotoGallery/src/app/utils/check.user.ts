export class CheckUser{
    public static userIsOwner(id:string):boolean{
        let userInfo = JSON.parse(localStorage.getItem("userInfo")!);
        if (userInfo!=null){
          let result = userInfo.id===id;
          return result;
        }else
          return false;
      }
}