import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ClassSummary } from "@/types/entities"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import { Users } from "lucide-react"

interface ClassListProps {
  classes: ClassSummary[]
  className?: string
}

export function ClassList({ classes, className }: ClassListProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Your Classes</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0">
          {classes.length > 0 ? (
            classes.map((classItem) => (
              <Link
                key={classItem.id}
                href={`/dashboard/classes/${classItem.id}`}
                className="block border-b last:border-0 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between p-4">
                  <div className="space-y-1">
                    <p className="font-medium">{classItem.name}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-3.5 w-3.5 mr-1" />
                      <span>{classItem.studentCount} students</span>
                    </div>
                  </div>
                  <div className="text-right">
                    {classItem.averageGrade && <p className="font-medium">{classItem.averageGrade}% avg</p>}
                    {classItem.nextSession && (
                      <p className="text-xs text-muted-foreground">
                        Next:{" "}
                        {formatDistanceToNow(new Date(classItem.nextSession), {
                          addSuffix: true,
                        })}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-4 text-center text-muted-foreground">No classes found</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
