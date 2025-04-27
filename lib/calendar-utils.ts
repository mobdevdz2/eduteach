// lib/calendar-utils.ts
export function getEventColor(type: string): string {
    switch (type) {
      case "class":
        return "#3174ad"
      case "assignment":
        return "#6aa84f"
      case "exam":
        return "#e69138"
      case "meeting":
        return "#8e7cc3"
      case "personal":
        return "#c27ba0"
      default:
        return "#3174ad"
    }
  }
  