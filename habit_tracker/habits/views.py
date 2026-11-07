from django.shortcuts import redirect, render

from .models import Habit


DEFAULT_HABITS = [
    {"name": "Water", "category": "Wellbeing", "streak": 8, "accent": "mint", "status": "done"},
    {"name": "Move your body", "category": "Health", "streak": 5, "accent": "coral", "status": "missed"},
    {"name": "Read 10 pages", "category": "Mind", "streak": 12, "accent": "violet", "status": "progress"},
]


def dashboard(request):
    if request.method == "POST":
        name = request.POST.get("name", "").strip()
        if name:
            Habit.objects.create(name=name)
        return redirect("dashboard")

    saved_habits = list(Habit.objects.order_by("created_at").values("name"))
    habits = DEFAULT_HABITS + [
        {"name": habit["name"], "category": "Personal", "streak": 0, "accent": "amber", "status": "empty"}
        for habit in saved_habits
        if habit["name"] not in {item["name"] for item in DEFAULT_HABITS}
    ]
    return render(request, "habits/dashboard.html", {"habits": habits})
