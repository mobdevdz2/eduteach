import React from "react";
import { BaseInputProps, StringInput, NumberInput, CheckboxInput, SelectInput, DateInput, TextInput } from "@/components/shared/form-inputs";
import { ClassesSelectorField } from "@/components/shared/entity-selector";
import { Classes } from "@/types/entities";
import { AssignmentsSelectorField } from "@/components/shared/entity-selector";
import { Assignments } from "@/types/entities";
import { UsersSelectorField } from "@/components/shared/entity-selector";
import { Users } from "@/types/entities";

interface CalendarEventsFormProps extends BaseInputProps {
  data?: {
    classes?: Classes[];
    assignments?: Assignments[];
    users?: Users[]
  };
}

const CalendarEventsForm = () => {
  return;
};


        const IdField = ({ form, data, name="id", label="Id" }: CalendarEventsFormProps) => {
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
        IdField.displayName = "CalendarEventsForm.IdField";
        CalendarEventsForm.IdField = IdField;
    

        const TitleField = ({ form, data, name="title", label="Title" }: CalendarEventsFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter title"
            
            />
        );
        };
        TitleField.displayName = "CalendarEventsForm.TitleField";
        CalendarEventsForm.TitleField = TitleField;
    

        const DescriptionField = ({ form, data, name="description", label="Description" }: CalendarEventsFormProps) => {
        return (
            <
        TextInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter description"
            rows={3}
          />
        );
        };
        DescriptionField.displayName = "CalendarEventsForm.DescriptionField";
        CalendarEventsForm.DescriptionField = DescriptionField;
    

        const StartDateField = ({ form, data, name="startDate", label="StartDate" }: CalendarEventsFormProps) => {
        return (
            <
        DateInput 
          form={form} 
          name={name} 
          label={label}
        />
        );
        };
        StartDateField.displayName = "CalendarEventsForm.StartDateField";
        CalendarEventsForm.StartDateField = StartDateField;
    

        const EndDateField = ({ form, data, name="endDate", label="EndDate" }: CalendarEventsFormProps) => {
        return (
            <
        DateInput 
          form={form} 
          name={name} 
          label={label}
        />
        );
        };
        EndDateField.displayName = "CalendarEventsForm.EndDateField";
        CalendarEventsForm.EndDateField = EndDateField;
    

        const AllDayField = ({ form, data, name="allDay", label="AllDay" }: CalendarEventsFormProps) => {
        return (
            <
          CheckboxInput 
            form={form} 
            name={name} 
            label={label}
          />
        );
        };
        AllDayField.displayName = "CalendarEventsForm.AllDayField";
        CalendarEventsForm.AllDayField = AllDayField;
    

        const LocationField = ({ form, data, name="location", label="Location" }: CalendarEventsFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter location"
            
            />
        );
        };
        LocationField.displayName = "CalendarEventsForm.LocationField";
        CalendarEventsForm.LocationField = LocationField;
    

        const TypeField = ({ form, data, name="type", label="Type" }: CalendarEventsFormProps) => {
        return (
            <
         SelectInput
            form={form}
            name={name}
            label={label}
            options={[{ value: "class", label: "Class" }, { value: "assignment", label: "Assignment" }, { value: "exam", label: "Exam" }, { value: "meeting", label: "Meeting" }, { value: "personal", label: "Personal" }]}
            placeholder="Select type"
          />
        );
        };
        TypeField.displayName = "CalendarEventsForm.TypeField";
        CalendarEventsForm.TypeField = TypeField;
    

        const ClassIdField = ({ form, data, name="classId", label="ClassId" }: CalendarEventsFormProps) => {
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
        ClassIdField.displayName = "CalendarEventsForm.ClassIdField";
        CalendarEventsForm.ClassIdField = ClassIdField;
    

        const AssignmentIdField = ({ form, data, name="assignmentId", label="AssignmentId" }: CalendarEventsFormProps) => {
        return (
            <
          AssignmentsSelectorField
            form={form}
            name={name}
            label={label}
            placeholder="Select assignments"
            options={data?.assignments || []}
          />
        );
        };
        AssignmentIdField.displayName = "CalendarEventsForm.AssignmentIdField";
        CalendarEventsForm.AssignmentIdField = AssignmentIdField;
    

        const LessonPlanIdField = ({ form, data, name="lessonPlanId", label="LessonPlanId" }: CalendarEventsFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter lessonPlanId"
            
            />
        );
        };
        LessonPlanIdField.displayName = "CalendarEventsForm.LessonPlanIdField";
        CalendarEventsForm.LessonPlanIdField = LessonPlanIdField;
    

        const ColorField = ({ form, data, name="color", label="Color" }: CalendarEventsFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter color"
            
            />
        );
        };
        ColorField.displayName = "CalendarEventsForm.ColorField";
        CalendarEventsForm.ColorField = ColorField;
    

        const UserIdField = ({ form, data, name="userId", label="UserId" }: CalendarEventsFormProps) => {
        return (
            <
          UsersSelectorField
            form={form}
            name={name}
            label={label}
            placeholder="Select users"
            options={data?.users || []}
          />
        );
        };
        UserIdField.displayName = "CalendarEventsForm.UserIdField";
        CalendarEventsForm.UserIdField = UserIdField;
    

        const RecurrenceRuleField = ({ form, data, name="recurrenceRule", label="RecurrenceRule" }: CalendarEventsFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter recurrenceRule"
            
            />
        );
        };
        RecurrenceRuleField.displayName = "CalendarEventsForm.RecurrenceRuleField";
        CalendarEventsForm.RecurrenceRuleField = RecurrenceRuleField;
    

        const IsRecurringField = ({ form, data, name="isRecurring", label="IsRecurring" }: CalendarEventsFormProps) => {
        return (
            <
          CheckboxInput 
            form={form} 
            name={name} 
            label={label}
          />
        );
        };
        IsRecurringField.displayName = "CalendarEventsForm.IsRecurringField";
        CalendarEventsForm.IsRecurringField = IsRecurringField;
    

        const VisibilityField = ({ form, data, name="visibility", label="Visibility" }: CalendarEventsFormProps) => {
        return (
            <
         SelectInput
            form={form}
            name={name}
            label={label}
            options={[{ value: "public", label: "Public" }, { value: "private", label: "Private" }, { value: "organization", label: "Organization" }]}
            placeholder="Select visibility"
          />
        );
        };
        VisibilityField.displayName = "CalendarEventsForm.VisibilityField";
        CalendarEventsForm.VisibilityField = VisibilityField;
    

        const RemindersField = ({ form, data, name="reminders", label="Reminders" }: CalendarEventsFormProps) => {
        return (
            <
        TextInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter reminders"
            rows={3}
          />
        );
        };
        RemindersField.displayName = "CalendarEventsForm.RemindersField";
        CalendarEventsForm.RemindersField = RemindersField;
    

        const CreatedAtField = ({ form, data, name="createdAt", label="CreatedAt" }: CalendarEventsFormProps) => {
        return (
            <
        DateInput 
          form={form} 
          name={name} 
          label={label}
        />
        );
        };
        CreatedAtField.displayName = "CalendarEventsForm.CreatedAtField";
        CalendarEventsForm.CreatedAtField = CreatedAtField;
    

        const UpdatedAtField = ({ form, data, name="updatedAt", label="UpdatedAt" }: CalendarEventsFormProps) => {
        return (
            <
        DateInput 
          form={form} 
          name={name} 
          label={label}
        />
        );
        };
        UpdatedAtField.displayName = "CalendarEventsForm.UpdatedAtField";
        CalendarEventsForm.UpdatedAtField = UpdatedAtField;
    

        const EnableRLSField = ({ form, data, name="enableRLS", label="EnableRLS" }: CalendarEventsFormProps) => {
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
        EnableRLSField.displayName = "CalendarEventsForm.EnableRLSField";
        CalendarEventsForm.EnableRLSField = EnableRLSField;
    

export default CalendarEventsForm;