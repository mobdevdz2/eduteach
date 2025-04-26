// Auto-generated enum selector components
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";

import { useState } from "react";
import { userRoleEnum, subscriptionPlanEnum, subscriptionStatusEnum, eventTypeEnum, assignmentStatusEnum, lessonPlanStatusEnum, eventVisibilityEnum } from "@/db/schema/tables";
import { EnumSelectorFields, EnumMultiSelectorFields } from "@/types/ui";

// Helper function to format display values
function formatDisplayValue(value: string): string {
  if (value.includes('_')) {
    return value
      .split('_')
      .map((s) => s[0].toUpperCase() + s.slice(1))
      .join(' ');
  }
  
  return value[0].toUpperCase() + value.slice(1);
}

export interface EnumSelectorProps {
  form: any;
  label?: string;
}

const enumSelectors: EnumSelectorFields = {

  UserRoleSelectorField: ({ form, label = "UserRole" }) => {
    return (
      <FormField
        control={form.control}
        name="userRole"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select userRole" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {userRoleEnum.enumValues.map((value) => (
                  <SelectItem key={value} value={value}>
                    {formatDisplayValue(value)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  },

  SubscriptionPlanSelectorField: ({ form, label = "SubscriptionPlan" }) => {
    return (
      <FormField
        control={form.control}
        name="subscriptionPlan"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select subscriptionPlan" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {subscriptionPlanEnum.enumValues.map((value) => (
                  <SelectItem key={value} value={value}>
                    {formatDisplayValue(value)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  },

  SubscriptionStatusSelectorField: ({ form, label = "SubscriptionStatus" }) => {
    return (
      <FormField
        control={form.control}
        name="subscriptionStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select subscriptionStatus" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {subscriptionStatusEnum.enumValues.map((value) => (
                  <SelectItem key={value} value={value}>
                    {formatDisplayValue(value)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  },

  EventTypeSelectorField: ({ form, label = "EventType" }) => {
    return (
      <FormField
        control={form.control}
        name="eventType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select eventType" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {eventTypeEnum.enumValues.map((value) => (
                  <SelectItem key={value} value={value}>
                    {formatDisplayValue(value)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  },

  AssignmentStatusSelectorField: ({ form, label = "AssignmentStatus" }) => {
    return (
      <FormField
        control={form.control}
        name="assignmentStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select assignmentStatus" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {assignmentStatusEnum.enumValues.map((value) => (
                  <SelectItem key={value} value={value}>
                    {formatDisplayValue(value)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  },

  LessonPlanStatusSelectorField: ({ form, label = "LessonPlanStatus" }) => {
    return (
      <FormField
        control={form.control}
        name="lessonPlanStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select lessonPlanStatus" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {lessonPlanStatusEnum.enumValues.map((value) => (
                  <SelectItem key={value} value={value}>
                    {formatDisplayValue(value)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  },

  EventVisibilitySelectorField: ({ form, label = "EventVisibility" }) => {
    return (
      <FormField
        control={form.control}
        name="eventVisibility"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select eventVisibility" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {eventVisibilityEnum.enumValues.map((value) => (
                  <SelectItem key={value} value={value}>
                    {formatDisplayValue(value)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  },
};

const multiEnumSelectors: EnumMultiSelectorFields = {

  UserRoleMultiSelectorField: ({ form, label = "UserRoles" }) => {
    const [open, setOpen] = useState(false);
    const selected = form.watch("userRoles") || [];

    const toggle = (value: string) => {
      const set = new Set(selected);
      if (set.has(value)) set.delete(value);
      else set.add(value);
      form.setValue("userRoles", Array.from(set));
    };

    return (
      <FormField
        control={form.control}
        name="userRoles"
        render={() => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Button variant="outline" onClick={() => setOpen(true)}>
                {selected.length === 0
                  ? "Select userRoles"
                  : `${selected.length} selected`}
              </Button>
            </FormControl>
            <FormMessage />

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Select UserRoles</DialogTitle>
                </DialogHeader>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {userRoleEnum.enumValues.map((value) => {
                    const isChecked = selected.includes(value);
                    return (
                      <div key={value} className="flex items-center gap-2">
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => toggle(value)}
                          id={value}
                        />
                        <label htmlFor={value} className="text-sm">
                          {formatDisplayValue(value)}
                        </label>
                      </div>
                    );
                  })}
                </div>
                <DialogFooter>
                  <Button onClick={() => setOpen(false)}>Done</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </FormItem>
        )}
      />
    );
  },

  SubscriptionPlanMultiSelectorField: ({ form, label = "SubscriptionPlans" }) => {
    const [open, setOpen] = useState(false);
    const selected = form.watch("subscriptionPlans") || [];

    const toggle = (value: string) => {
      const set = new Set(selected);
      if (set.has(value)) set.delete(value);
      else set.add(value);
      form.setValue("subscriptionPlans", Array.from(set));
    };

    return (
      <FormField
        control={form.control}
        name="subscriptionPlans"
        render={() => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Button variant="outline" onClick={() => setOpen(true)}>
                {selected.length === 0
                  ? "Select subscriptionPlans"
                  : `${selected.length} selected`}
              </Button>
            </FormControl>
            <FormMessage />

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Select SubscriptionPlans</DialogTitle>
                </DialogHeader>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {subscriptionPlanEnum.enumValues.map((value) => {
                    const isChecked = selected.includes(value);
                    return (
                      <div key={value} className="flex items-center gap-2">
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => toggle(value)}
                          id={value}
                        />
                        <label htmlFor={value} className="text-sm">
                          {formatDisplayValue(value)}
                        </label>
                      </div>
                    );
                  })}
                </div>
                <DialogFooter>
                  <Button onClick={() => setOpen(false)}>Done</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </FormItem>
        )}
      />
    );
  },

  SubscriptionStatusMultiSelectorField: ({ form, label = "SubscriptionStatuss" }) => {
    const [open, setOpen] = useState(false);
    const selected = form.watch("subscriptionStatuss") || [];

    const toggle = (value: string) => {
      const set = new Set(selected);
      if (set.has(value)) set.delete(value);
      else set.add(value);
      form.setValue("subscriptionStatuss", Array.from(set));
    };

    return (
      <FormField
        control={form.control}
        name="subscriptionStatuss"
        render={() => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Button variant="outline" onClick={() => setOpen(true)}>
                {selected.length === 0
                  ? "Select subscriptionStatuss"
                  : `${selected.length} selected`}
              </Button>
            </FormControl>
            <FormMessage />

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Select SubscriptionStatuss</DialogTitle>
                </DialogHeader>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {subscriptionStatusEnum.enumValues.map((value) => {
                    const isChecked = selected.includes(value);
                    return (
                      <div key={value} className="flex items-center gap-2">
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => toggle(value)}
                          id={value}
                        />
                        <label htmlFor={value} className="text-sm">
                          {formatDisplayValue(value)}
                        </label>
                      </div>
                    );
                  })}
                </div>
                <DialogFooter>
                  <Button onClick={() => setOpen(false)}>Done</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </FormItem>
        )}
      />
    );
  },

  EventTypeMultiSelectorField: ({ form, label = "EventTypes" }) => {
    const [open, setOpen] = useState(false);
    const selected = form.watch("eventTypes") || [];

    const toggle = (value: string) => {
      const set = new Set(selected);
      if (set.has(value)) set.delete(value);
      else set.add(value);
      form.setValue("eventTypes", Array.from(set));
    };

    return (
      <FormField
        control={form.control}
        name="eventTypes"
        render={() => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Button variant="outline" onClick={() => setOpen(true)}>
                {selected.length === 0
                  ? "Select eventTypes"
                  : `${selected.length} selected`}
              </Button>
            </FormControl>
            <FormMessage />

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Select EventTypes</DialogTitle>
                </DialogHeader>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {eventTypeEnum.enumValues.map((value) => {
                    const isChecked = selected.includes(value);
                    return (
                      <div key={value} className="flex items-center gap-2">
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => toggle(value)}
                          id={value}
                        />
                        <label htmlFor={value} className="text-sm">
                          {formatDisplayValue(value)}
                        </label>
                      </div>
                    );
                  })}
                </div>
                <DialogFooter>
                  <Button onClick={() => setOpen(false)}>Done</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </FormItem>
        )}
      />
    );
  },

  AssignmentStatusMultiSelectorField: ({ form, label = "AssignmentStatuss" }) => {
    const [open, setOpen] = useState(false);
    const selected = form.watch("assignmentStatuss") || [];

    const toggle = (value: string) => {
      const set = new Set(selected);
      if (set.has(value)) set.delete(value);
      else set.add(value);
      form.setValue("assignmentStatuss", Array.from(set));
    };

    return (
      <FormField
        control={form.control}
        name="assignmentStatuss"
        render={() => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Button variant="outline" onClick={() => setOpen(true)}>
                {selected.length === 0
                  ? "Select assignmentStatuss"
                  : `${selected.length} selected`}
              </Button>
            </FormControl>
            <FormMessage />

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Select AssignmentStatuss</DialogTitle>
                </DialogHeader>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {assignmentStatusEnum.enumValues.map((value) => {
                    const isChecked = selected.includes(value);
                    return (
                      <div key={value} className="flex items-center gap-2">
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => toggle(value)}
                          id={value}
                        />
                        <label htmlFor={value} className="text-sm">
                          {formatDisplayValue(value)}
                        </label>
                      </div>
                    );
                  })}
                </div>
                <DialogFooter>
                  <Button onClick={() => setOpen(false)}>Done</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </FormItem>
        )}
      />
    );
  },

  LessonPlanStatusMultiSelectorField: ({ form, label = "LessonPlanStatuss" }) => {
    const [open, setOpen] = useState(false);
    const selected = form.watch("lessonPlanStatuss") || [];

    const toggle = (value: string) => {
      const set = new Set(selected);
      if (set.has(value)) set.delete(value);
      else set.add(value);
      form.setValue("lessonPlanStatuss", Array.from(set));
    };

    return (
      <FormField
        control={form.control}
        name="lessonPlanStatuss"
        render={() => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Button variant="outline" onClick={() => setOpen(true)}>
                {selected.length === 0
                  ? "Select lessonPlanStatuss"
                  : `${selected.length} selected`}
              </Button>
            </FormControl>
            <FormMessage />

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Select LessonPlanStatuss</DialogTitle>
                </DialogHeader>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {lessonPlanStatusEnum.enumValues.map((value) => {
                    const isChecked = selected.includes(value);
                    return (
                      <div key={value} className="flex items-center gap-2">
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => toggle(value)}
                          id={value}
                        />
                        <label htmlFor={value} className="text-sm">
                          {formatDisplayValue(value)}
                        </label>
                      </div>
                    );
                  })}
                </div>
                <DialogFooter>
                  <Button onClick={() => setOpen(false)}>Done</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </FormItem>
        )}
      />
    );
  },

  EventVisibilityMultiSelectorField: ({ form, label = "EventVisibilitys" }) => {
    const [open, setOpen] = useState(false);
    const selected = form.watch("eventVisibilitys") || [];

    const toggle = (value: string) => {
      const set = new Set(selected);
      if (set.has(value)) set.delete(value);
      else set.add(value);
      form.setValue("eventVisibilitys", Array.from(set));
    };

    return (
      <FormField
        control={form.control}
        name="eventVisibilitys"
        render={() => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Button variant="outline" onClick={() => setOpen(true)}>
                {selected.length === 0
                  ? "Select eventVisibilitys"
                  : `${selected.length} selected`}
              </Button>
            </FormControl>
            <FormMessage />

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Select EventVisibilitys</DialogTitle>
                </DialogHeader>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {eventVisibilityEnum.enumValues.map((value) => {
                    const isChecked = selected.includes(value);
                    return (
                      <div key={value} className="flex items-center gap-2">
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => toggle(value)}
                          id={value}
                        />
                        <label htmlFor={value} className="text-sm">
                          {formatDisplayValue(value)}
                        </label>
                      </div>
                    );
                  })}
                </div>
                <DialogFooter>
                  <Button onClick={() => setOpen(false)}>Done</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </FormItem>
        )}
      />
    );
  },
};

export const {
  UserRoleSelectorField,
  UserRoleMultiSelectorField,
  SubscriptionPlanSelectorField,
  SubscriptionPlanMultiSelectorField,
  SubscriptionStatusSelectorField,
  SubscriptionStatusMultiSelectorField,
  EventTypeSelectorField,
  EventTypeMultiSelectorField,
  AssignmentStatusSelectorField,
  AssignmentStatusMultiSelectorField,
  LessonPlanStatusSelectorField,
  LessonPlanStatusMultiSelectorField,
  EventVisibilitySelectorField,
  EventVisibilityMultiSelectorField,
} = { ...enumSelectors, ...multiEnumSelectors };
