import { TAcademicSemester } from "./academicManagement.type";



export type TSemester = {


    _id:string;
    academicSemester:TAcademicSemester;
    status:string;
    startDate:string;
    endDate:string;
    minCredit:number;
    maxCredit:number;
    cretedAt:string;
    updatedAt:string;

}


export type TCourses = {
  _id: any;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  isDeleted?: boolean;
  preRequisiteCourses: [];
};