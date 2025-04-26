// Auto-generated entity selector components
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
import {
  MultiSelectorFields,
  SelectorFields,
  SelectEntities
} from "@/types/ui";

const singleSelectors: SelectorFields<SelectEntities> = {

  OrganizationsSelectorField: ({ form, data }) => {
    return (
      <FormField
        control={form.control}
        name="organizationsId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Organizations</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select organizations" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data?.organizations?.map((organizations) => (
                  <SelectItem key={organizations.id} value={organizations.id}>
                    {organizations.name}
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

  UsersSelectorField: ({ form, data }) => {
    return (
      <FormField
        control={form.control}
        name="usersId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Users</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select users" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data?.users?.map((users) => (
                  <SelectItem key={users.id} value={users.id}>
                    {users.name}
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

  AccountsSelectorField: ({ form, data }) => {
    return (
      <FormField
        control={form.control}
        name="accountId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Accounts</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select accounts" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data?.accounts?.map((accounts) => (
                  <SelectItem key={accounts.id} value={accounts.id}>
                    {accounts.name}
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

  SessionsSelectorField: ({ form, data }) => {
    return (
      <FormField
        control={form.control}
        name="sessionsId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sessions</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select sessions" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data?.sessions?.map((sessions) => (
                  <SelectItem key={sessions.id} value={sessions.id}>
                    {sessions.name}
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

  VerificationTokensSelectorField: ({ form, data }) => {
    return (
      <FormField
        control={form.control}
        name="verificationTokensId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>VerificationTokens</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select verificationTokens" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data?.verificationTokens?.map((verificationTokens) => (
                  <SelectItem key={verificationTokens.id} value={verificationTokens.id}>
                    {verificationTokens.name}
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

  SubscriptionsSelectorField: ({ form, data }) => {
    return (
      <FormField
        control={form.control}
        name="subscriptionsId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Subscriptions</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select subscriptions" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data?.subscriptions?.map((subscriptions) => (
                  <SelectItem key={subscriptions.id} value={subscriptions.id}>
                    {subscriptions.name}
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

  FeatureLimitsSelectorField: ({ form, data }) => {
    return (
      <FormField
        control={form.control}
        name="featureLimitsId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>FeatureLimits</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select featureLimits" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data?.featureLimits?.map((featureLimits) => (
                  <SelectItem key={featureLimits.id} value={featureLimits.id}>
                    {featureLimits.name}
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

  ClassesSelectorField: ({ form, data }) => {
    return (
      <FormField
        control={form.control}
        name="classesId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Classes</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select classes" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data?.classes?.map((classes) => (
                  <SelectItem key={classes.id} value={classes.id}>
                    {classes.name}
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

  StudentsSelectorField: ({ form, data }) => {
    return (
      <FormField
        control={form.control}
        name="studentId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Students</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select students" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data?.students?.map((student) => (
                  <SelectItem key={student.id} value={student.id}>
                    {student.name}
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

  ClassStudentsSelectorField: ({ form, data }) => {
    return (
      <FormField
        control={form.control}
        name="classStudentsId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>ClassStudents</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select classStudents" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data?.classStudents?.map((classStudents) => (
                  <SelectItem key={classStudents.id} value={classStudents.id}>
                    {classStudents.name}
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

  AssignmentsSelectorField: ({ form, data }) => {
    return (
      <FormField
        control={form.control}
        name="assignmentsId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Assignments</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select assignments" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data?.assignments?.map((assignments) => (
                  <SelectItem key={assignments.id} value={assignments.id}>
                    {assignments.name}
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

  AssignmentSubmissionsSelectorField: ({ form, data }) => {
    return (
      <FormField
        control={form.control}
        name="assignmentSubmissionsId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>AssignmentSubmissions</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select assignmentSubmissions" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data?.assignmentSubmissions?.map((assignmentSubmissions) => (
                  <SelectItem key={assignmentSubmissions.id} value={assignmentSubmissions.id}>
                    {assignmentSubmissions.name}
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

  GradesSelectorField: ({ form, data }) => {
    return (
      <FormField
        control={form.control}
        name="gradesId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Grades</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select grades" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data?.grades?.map((grades) => (
                  <SelectItem key={grades.id} value={grades.id}>
                    {grades.name}
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

  MaterialsSelectorField: ({ form, data }) => {
    return (
      <FormField
        control={form.control}
        name="materialsId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Materials</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select materials" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data?.materials?.map((materials) => (
                  <SelectItem key={materials.id} value={materials.id}>
                    {materials.name}
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

  LessonPlansSelectorField: ({ form, data }) => {
    return (
      <FormField
        control={form.control}
        name="lessonPlansId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>LessonPlans</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select lessonPlans" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data?.lessonPlans?.map((lessonPlans) => (
                  <SelectItem key={lessonPlans.id} value={lessonPlans.id}>
                    {lessonPlans.name}
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

  CalendarEventsSelectorField: ({ form, data }) => {
    return (
      <FormField
        control={form.control}
        name="calendarEventsId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>CalendarEvents</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select calendarEvents" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data?.calendarEvents?.map((calendarEvents) => (
                  <SelectItem key={calendarEvents.id} value={calendarEvents.id}>
                    {calendarEvents.name}
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

const multiSelectors: MultiSelectorFields<SelectEntities> = {

  OrganizationsMultiSelectorField: ({ form, data }) => {
    const [open, setOpen] = useState(false);
    const selected = form.watch("organizationsIds") || [];

    const toggle = (id: string) => {
      const set = new Set(selected);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      form.setValue("organizationsIds", Array.from(set));
    };

    return (
      <FormField
        control={form.control}
        name="organizationsIds"
        render={() => (
          <FormItem>
            <FormLabel>Organizations</FormLabel>
            <FormControl>
              <Button variant="outline" onClick={() => setOpen(true)}>
                {selected.length === 0
                  ? "Select organizations"
                  : `${selected.length} selected`}
              </Button>
            </FormControl>
            <FormMessage />

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Select Organizations</DialogTitle>
                </DialogHeader>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {data?.organizations?.map((organizations) => {
                    const isChecked = selected.includes(organizations.id);
                    return (
                      <div key={organizations.id} className="flex items-center gap-2">
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => toggle(organizations.id)}
                          id={organizations.id}
                        />
                        <label htmlFor={organizations.id} className="text-sm">
                          {organizations.name}
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

  UsersMultiSelectorField: ({ form, data }) => {
    const [open, setOpen] = useState(false);
    const selected = form.watch("usersIds") || [];

    const toggle = (id: string) => {
      const set = new Set(selected);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      form.setValue("usersIds", Array.from(set));
    };

    return (
      <FormField
        control={form.control}
        name="usersIds"
        render={() => (
          <FormItem>
            <FormLabel>Users</FormLabel>
            <FormControl>
              <Button variant="outline" onClick={() => setOpen(true)}>
                {selected.length === 0
                  ? "Select users"
                  : `${selected.length} selected`}
              </Button>
            </FormControl>
            <FormMessage />

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Select Users</DialogTitle>
                </DialogHeader>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {data?.users?.map((users) => {
                    const isChecked = selected.includes(users.id);
                    return (
                      <div key={users.id} className="flex items-center gap-2">
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => toggle(users.id)}
                          id={users.id}
                        />
                        <label htmlFor={users.id} className="text-sm">
                          {users.name}
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

  AccountsMultiSelectorField: ({ form, data }) => {
    const [open, setOpen] = useState(false);
    const selected = form.watch("accountsIds") || [];

    const toggle = (id: string) => {
      const set = new Set(selected);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      form.setValue("accountsIds", Array.from(set));
    };

    return (
      <FormField
        control={form.control}
        name="accountsIds"
        render={() => (
          <FormItem>
            <FormLabel>Accounts</FormLabel>
            <FormControl>
              <Button variant="outline" onClick={() => setOpen(true)}>
                {selected.length === 0
                  ? "Select accounts"
                  : `${selected.length} selected`}
              </Button>
            </FormControl>
            <FormMessage />

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Select Accounts</DialogTitle>
                </DialogHeader>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {data?.accounts?.map((accounts) => {
                    const isChecked = selected.includes(accounts.id);
                    return (
                      <div key={accounts.id} className="flex items-center gap-2">
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => toggle(accounts.id)}
                          id={accounts.id}
                        />
                        <label htmlFor={accounts.id} className="text-sm">
                          {accounts.name}
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

  SessionsMultiSelectorField: ({ form, data }) => {
    const [open, setOpen] = useState(false);
    const selected = form.watch("sessionsIds") || [];

    const toggle = (id: string) => {
      const set = new Set(selected);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      form.setValue("sessionsIds", Array.from(set));
    };

    return (
      <FormField
        control={form.control}
        name="sessionsIds"
        render={() => (
          <FormItem>
            <FormLabel>Sessions</FormLabel>
            <FormControl>
              <Button variant="outline" onClick={() => setOpen(true)}>
                {selected.length === 0
                  ? "Select sessions"
                  : `${selected.length} selected`}
              </Button>
            </FormControl>
            <FormMessage />

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Select Sessions</DialogTitle>
                </DialogHeader>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {data?.sessions?.map((sessions) => {
                    const isChecked = selected.includes(sessions.id);
                    return (
                      <div key={sessions.id} className="flex items-center gap-2">
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => toggle(sessions.id)}
                          id={sessions.id}
                        />
                        <label htmlFor={sessions.id} className="text-sm">
                          {sessions.name}
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

  VerificationTokensMultiSelectorField: ({ form, data }) => {
    const [open, setOpen] = useState(false);
    const selected = form.watch("verificationTokensIds") || [];

    const toggle = (id: string) => {
      const set = new Set(selected);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      form.setValue("verificationTokensIds", Array.from(set));
    };

    return (
      <FormField
        control={form.control}
        name="verificationTokensIds"
        render={() => (
          <FormItem>
            <FormLabel>VerificationTokens</FormLabel>
            <FormControl>
              <Button variant="outline" onClick={() => setOpen(true)}>
                {selected.length === 0
                  ? "Select verificationTokens"
                  : `${selected.length} selected`}
              </Button>
            </FormControl>
            <FormMessage />

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Select VerificationTokens</DialogTitle>
                </DialogHeader>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {data?.verificationTokens?.map((verificationTokens) => {
                    const isChecked = selected.includes(verificationTokens.id);
                    return (
                      <div key={verificationTokens.id} className="flex items-center gap-2">
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => toggle(verificationTokens.id)}
                          id={verificationTokens.id}
                        />
                        <label htmlFor={verificationTokens.id} className="text-sm">
                          {verificationTokens.name}
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

  SubscriptionsMultiSelectorField: ({ form, data }) => {
    const [open, setOpen] = useState(false);
    const selected = form.watch("subscriptionsIds") || [];

    const toggle = (id: string) => {
      const set = new Set(selected);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      form.setValue("subscriptionsIds", Array.from(set));
    };

    return (
      <FormField
        control={form.control}
        name="subscriptionsIds"
        render={() => (
          <FormItem>
            <FormLabel>Subscriptions</FormLabel>
            <FormControl>
              <Button variant="outline" onClick={() => setOpen(true)}>
                {selected.length === 0
                  ? "Select subscriptions"
                  : `${selected.length} selected`}
              </Button>
            </FormControl>
            <FormMessage />

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Select Subscriptions</DialogTitle>
                </DialogHeader>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {data?.subscriptions?.map((subscriptions) => {
                    const isChecked = selected.includes(subscriptions.id);
                    return (
                      <div key={subscriptions.id} className="flex items-center gap-2">
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => toggle(subscriptions.id)}
                          id={subscriptions.id}
                        />
                        <label htmlFor={subscriptions.id} className="text-sm">
                          {subscriptions.name}
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

  FeatureLimitsMultiSelectorField: ({ form, data }) => {
    const [open, setOpen] = useState(false);
    const selected = form.watch("featureLimitsIds") || [];

    const toggle = (id: string) => {
      const set = new Set(selected);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      form.setValue("featureLimitsIds", Array.from(set));
    };

    return (
      <FormField
        control={form.control}
        name="featureLimitsIds"
        render={() => (
          <FormItem>
            <FormLabel>FeatureLimits</FormLabel>
            <FormControl>
              <Button variant="outline" onClick={() => setOpen(true)}>
                {selected.length === 0
                  ? "Select featureLimits"
                  : `${selected.length} selected`}
              </Button>
            </FormControl>
            <FormMessage />

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Select FeatureLimits</DialogTitle>
                </DialogHeader>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {data?.featureLimits?.map((featureLimits) => {
                    const isChecked = selected.includes(featureLimits.id);
                    return (
                      <div key={featureLimits.id} className="flex items-center gap-2">
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => toggle(featureLimits.id)}
                          id={featureLimits.id}
                        />
                        <label htmlFor={featureLimits.id} className="text-sm">
                          {featureLimits.name}
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

  ClassesMultiSelectorField: ({ form, data }) => {
    const [open, setOpen] = useState(false);
    const selected = form.watch("classesIds") || [];

    const toggle = (id: string) => {
      const set = new Set(selected);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      form.setValue("classesIds", Array.from(set));
    };

    return (
      <FormField
        control={form.control}
        name="classesIds"
        render={() => (
          <FormItem>
            <FormLabel>Classes</FormLabel>
            <FormControl>
              <Button variant="outline" onClick={() => setOpen(true)}>
                {selected.length === 0
                  ? "Select classes"
                  : `${selected.length} selected`}
              </Button>
            </FormControl>
            <FormMessage />

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Select Classes</DialogTitle>
                </DialogHeader>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {data?.classes?.map((classes) => {
                    const isChecked = selected.includes(classes.id);
                    return (
                      <div key={classes.id} className="flex items-center gap-2">
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => toggle(classes.id)}
                          id={classes.id}
                        />
                        <label htmlFor={classes.id} className="text-sm">
                          {classes.name}
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

  StudentsMultiSelectorField: ({ form, data }) => {
    const [open, setOpen] = useState(false);
    const selected = form.watch("studentsIds") || [];

    const toggle = (id: string) => {
      const set = new Set(selected);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      form.setValue("studentsIds", Array.from(set));
    };

    return (
      <FormField
        control={form.control}
        name="studentsIds"
        render={() => (
          <FormItem>
            <FormLabel>Students</FormLabel>
            <FormControl>
              <Button variant="outline" onClick={() => setOpen(true)}>
                {selected.length === 0
                  ? "Select students"
                  : `${selected.length} selected`}
              </Button>
            </FormControl>
            <FormMessage />

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Select Students</DialogTitle>
                </DialogHeader>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {data?.students?.map((students) => {
                    const isChecked = selected.includes(students.id);
                    return (
                      <div key={students.id} className="flex items-center gap-2">
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => toggle(students.id)}
                          id={students.id}
                        />
                        <label htmlFor={students.id} className="text-sm">
                          {students.name}
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

  ClassStudentsMultiSelectorField: ({ form, data }) => {
    const [open, setOpen] = useState(false);
    const selected = form.watch("classStudentsIds") || [];

    const toggle = (id: string) => {
      const set = new Set(selected);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      form.setValue("classStudentsIds", Array.from(set));
    };

    return (
      <FormField
        control={form.control}
        name="classStudentsIds"
        render={() => (
          <FormItem>
            <FormLabel>ClassStudents</FormLabel>
            <FormControl>
              <Button variant="outline" onClick={() => setOpen(true)}>
                {selected.length === 0
                  ? "Select classStudents"
                  : `${selected.length} selected`}
              </Button>
            </FormControl>
            <FormMessage />

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Select ClassStudents</DialogTitle>
                </DialogHeader>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {data?.classStudents?.map((classStudents) => {
                    const isChecked = selected.includes(classStudents.id);
                    return (
                      <div key={classStudents.id} className="flex items-center gap-2">
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => toggle(classStudents.id)}
                          id={classStudents.id}
                        />
                        <label htmlFor={classStudents.id} className="text-sm">
                          {classStudents.name}
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

  AssignmentsMultiSelectorField: ({ form, data }) => {
    const [open, setOpen] = useState(false);
    const selected = form.watch("assignmentsIds") || [];

    const toggle = (id: string) => {
      const set = new Set(selected);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      form.setValue("assignmentsIds", Array.from(set));
    };

    return (
      <FormField
        control={form.control}
        name="assignmentsIds"
        render={() => (
          <FormItem>
            <FormLabel>Assignments</FormLabel>
            <FormControl>
              <Button variant="outline" onClick={() => setOpen(true)}>
                {selected.length === 0
                  ? "Select assignments"
                  : `${selected.length} selected`}
              </Button>
            </FormControl>
            <FormMessage />

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Select Assignments</DialogTitle>
                </DialogHeader>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {data?.assignments?.map((assignments) => {
                    const isChecked = selected.includes(assignments.id);
                    return (
                      <div key={assignments.id} className="flex items-center gap-2">
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => toggle(assignments.id)}
                          id={assignments.id}
                        />
                        <label htmlFor={assignments.id} className="text-sm">
                          {assignments.name}
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

  AssignmentSubmissionsMultiSelectorField: ({ form, data }) => {
    const [open, setOpen] = useState(false);
    const selected = form.watch("assignmentSubmissionsIds") || [];

    const toggle = (id: string) => {
      const set = new Set(selected);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      form.setValue("assignmentSubmissionsIds", Array.from(set));
    };

    return (
      <FormField
        control={form.control}
        name="assignmentSubmissionsIds"
        render={() => (
          <FormItem>
            <FormLabel>AssignmentSubmissions</FormLabel>
            <FormControl>
              <Button variant="outline" onClick={() => setOpen(true)}>
                {selected.length === 0
                  ? "Select assignmentSubmissions"
                  : `${selected.length} selected`}
              </Button>
            </FormControl>
            <FormMessage />

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Select AssignmentSubmissions</DialogTitle>
                </DialogHeader>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {data?.assignmentSubmissions?.map((assignmentSubmissions) => {
                    const isChecked = selected.includes(assignmentSubmissions.id);
                    return (
                      <div key={assignmentSubmissions.id} className="flex items-center gap-2">
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => toggle(assignmentSubmissions.id)}
                          id={assignmentSubmissions.id}
                        />
                        <label htmlFor={assignmentSubmissions.id} className="text-sm">
                          {assignmentSubmissions.name}
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

  GradesMultiSelectorField: ({ form, data }) => {
    const [open, setOpen] = useState(false);
    const selected = form.watch("gradesIds") || [];

    const toggle = (id: string) => {
      const set = new Set(selected);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      form.setValue("gradesIds", Array.from(set));
    };

    return (
      <FormField
        control={form.control}
        name="gradesIds"
        render={() => (
          <FormItem>
            <FormLabel>Grades</FormLabel>
            <FormControl>
              <Button variant="outline" onClick={() => setOpen(true)}>
                {selected.length === 0
                  ? "Select grades"
                  : `${selected.length} selected`}
              </Button>
            </FormControl>
            <FormMessage />

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Select Grades</DialogTitle>
                </DialogHeader>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {data?.grades?.map((grades) => {
                    const isChecked = selected.includes(grades.id);
                    return (
                      <div key={grades.id} className="flex items-center gap-2">
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => toggle(grades.id)}
                          id={grades.id}
                        />
                        <label htmlFor={grades.id} className="text-sm">
                          {grades.name}
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

  MaterialsMultiSelectorField: ({ form, data }) => {
    const [open, setOpen] = useState(false);
    const selected = form.watch("materialsIds") || [];

    const toggle = (id: string) => {
      const set = new Set(selected);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      form.setValue("materialsIds", Array.from(set));
    };

    return (
      <FormField
        control={form.control}
        name="materialsIds"
        render={() => (
          <FormItem>
            <FormLabel>Materials</FormLabel>
            <FormControl>
              <Button variant="outline" onClick={() => setOpen(true)}>
                {selected.length === 0
                  ? "Select materials"
                  : `${selected.length} selected`}
              </Button>
            </FormControl>
            <FormMessage />

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Select Materials</DialogTitle>
                </DialogHeader>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {data?.materials?.map((materials) => {
                    const isChecked = selected.includes(materials.id);
                    return (
                      <div key={materials.id} className="flex items-center gap-2">
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => toggle(materials.id)}
                          id={materials.id}
                        />
                        <label htmlFor={materials.id} className="text-sm">
                          {materials.name}
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

  LessonPlansMultiSelectorField: ({ form, data }) => {
    const [open, setOpen] = useState(false);
    const selected = form.watch("lessonPlansIds") || [];

    const toggle = (id: string) => {
      const set = new Set(selected);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      form.setValue("lessonPlansIds", Array.from(set));
    };

    return (
      <FormField
        control={form.control}
        name="lessonPlansIds"
        render={() => (
          <FormItem>
            <FormLabel>LessonPlans</FormLabel>
            <FormControl>
              <Button variant="outline" onClick={() => setOpen(true)}>
                {selected.length === 0
                  ? "Select lessonPlans"
                  : `${selected.length} selected`}
              </Button>
            </FormControl>
            <FormMessage />

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Select LessonPlans</DialogTitle>
                </DialogHeader>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {data?.lessonPlans?.map((lessonPlans) => {
                    const isChecked = selected.includes(lessonPlans.id);
                    return (
                      <div key={lessonPlans.id} className="flex items-center gap-2">
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => toggle(lessonPlans.id)}
                          id={lessonPlans.id}
                        />
                        <label htmlFor={lessonPlans.id} className="text-sm">
                          {lessonPlans.name}
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

  CalendarEventsMultiSelectorField: ({ form, data }) => {
    const [open, setOpen] = useState(false);
    const selected = form.watch("calendarEventsIds") || [];

    const toggle = (id: string) => {
      const set = new Set(selected);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      form.setValue("calendarEventsIds", Array.from(set));
    };

    return (
      <FormField
        control={form.control}
        name="calendarEventsIds"
        render={() => (
          <FormItem>
            <FormLabel>CalendarEvents</FormLabel>
            <FormControl>
              <Button variant="outline" onClick={() => setOpen(true)}>
                {selected.length === 0
                  ? "Select calendarEvents"
                  : `${selected.length} selected`}
              </Button>
            </FormControl>
            <FormMessage />

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Select CalendarEvents</DialogTitle>
                </DialogHeader>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {data?.calendarEvents?.map((calendarEvents) => {
                    const isChecked = selected.includes(calendarEvents.id);
                    return (
                      <div key={calendarEvents.id} className="flex items-center gap-2">
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => toggle(calendarEvents.id)}
                          id={calendarEvents.id}
                        />
                        <label htmlFor={calendarEvents.id} className="text-sm">
                          {calendarEvents.name}
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

  OrganizationsSelectorField,
  OrganizationsMultiSelectorField,
  UsersSelectorField,
  UsersMultiSelectorField,
  AccountsSelectorField,
  AccountsMultiSelectorField,
  SessionsSelectorField,
  SessionsMultiSelectorField,
  VerificationTokensSelectorField,
  VerificationTokensMultiSelectorField,
  SubscriptionsSelectorField,
  SubscriptionsMultiSelectorField,
  FeatureLimitsSelectorField,
  FeatureLimitsMultiSelectorField,
  ClassesSelectorField,
  ClassesMultiSelectorField,
  StudentsSelectorField,
  StudentsMultiSelectorField,
  ClassStudentsSelectorField,
  ClassStudentsMultiSelectorField,
  AssignmentsSelectorField,
  AssignmentsMultiSelectorField,
  AssignmentSubmissionsSelectorField,
  AssignmentSubmissionsMultiSelectorField,
  GradesSelectorField,
  GradesMultiSelectorField,
  MaterialsSelectorField,
  MaterialsMultiSelectorField,
  LessonPlansSelectorField,
  LessonPlansMultiSelectorField,
  CalendarEventsSelectorField,
  CalendarEventsMultiSelectorField,
} = { ...singleSelectors, ...multiSelectors };
