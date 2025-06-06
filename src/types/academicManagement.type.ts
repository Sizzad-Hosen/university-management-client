

export type TAcademicSemester = {
    _id:string;
    name:string;
    year:string;
    code:string;
    startMonth:string;
    endMonth:string;
    createdAt:string;
    updatedAt:string;
    _v:number
}

export type TAcademicDepartment = {
    name:string;
    academicFaculty:string
}

export type TAcademicFaculty ={
    name:string
}