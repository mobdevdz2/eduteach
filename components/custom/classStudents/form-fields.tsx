import React from "react";
import { BaseInputProps, StringInput, NumberInput, CheckboxInput, SelectInput, DateInput, TextInput } from "@/components/shared/form-inputs";
import { ClassesSelectorField } from "@/components/shared/entity-selector";
import { Classes } from "@/types/entities";
import { StudentsSelectorField } from "@/components/shared/entity-selector";
import { Students } from "@/types/entities";

interface ClassStudentsFormProps extends BaseInputProps {
  data?: {
    students?: Students[];
    classes?: Classes[]
  };
}

const ClassStudentsForm = () => {
  return;
};


        const IdField = ({ form, data, name="id", label="Id" }: ClassStudentsFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter id"
            
            />
        );
        };
        IdField.displayName = "ClassStudentsForm.IdField";
        ClassStudentsForm.IdField = IdField;
    

        const ClassIdField = ({ form, data, name="classId", label="ClassId" }: ClassStudentsFormProps) => {
        return (
            <
          ClassesSelectorField
            form={form}
            name={name}
            label={label}
            placeholder="Select classes"
            options={data?.classes || []}
          />
        );
        };
        ClassIdField.displayName = "ClassStudentsForm.ClassIdField";
        ClassStudentsForm.ClassIdField = ClassIdField;
    

        const StudentIdField = ({ form, data, name="studentId", label="StudentId" }: ClassStudentsFormProps) => {
        return (
            <
          StudentsSelectorField
            form={form}
            name={name}
            label={label}
            placeholder="Select students"
            options={data?.students || []}
          />
        );
        };
        StudentIdField.displayName = "ClassStudentsForm.StudentIdField";
        ClassStudentsForm.StudentIdField = StudentIdField;
    

        const EnrollmentDateField = ({ form, data, name="enrollmentDate", label="EnrollmentDate" }: ClassStudentsFormProps) => {
        return (
            <
        DateInput 
          form={form} 
          name={name} 
          label={label}
        />
        );
        };
        EnrollmentDateField.displayName = "ClassStudentsForm.EnrollmentDateField";
        ClassStudentsForm.EnrollmentDateField = EnrollmentDateField;
    

        const EnableRLSField = ({ form, data, name="enableRLS", label="EnableRLS" }: ClassStudentsFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter enableRLS"
            
            />
        );
        };
        EnableRLSField.displayName = "ClassStudentsForm.EnableRLSField";
        ClassStudentsForm.EnableRLSField = EnableRLSField;
    

export default ClassStudentsForm;