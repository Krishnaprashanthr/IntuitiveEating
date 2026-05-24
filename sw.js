const REMINDER_MESSAGES = [
  "Your stomach called. It left a voicemail. Log a meal before it calls again.",
  "7 PM and no log yet? Your hunger scale is feeling neglected.",
  "Plot twist: you forgot to tell us how today felt. The app is mildly concerned.",
  "No entry today. Your intuitive eating streak is giving you side-eye.",
  "It's 7 PM. Did you eat? The sliders are bored.",
  "Friendly nudge: your body had thoughts today. Write one down?",
  "The blue zone misses you. Log something before bedtime guilt kicks in.",
  "Zero meals logged today. Even your snack drawer thinks that's suspicious.",
  "Your hunger cues are tap-dancing for attention. One log, please.",
  "7 PM check-in: intuitive eating can't read minds. Yet.",
];

let reminderTimer = null;
let pendingReminder = null;
let showingReminder = false;
let reminderState = {
  notifiedDate: "",
  hasMealToday: false,
};

function pickMessage() {
  return REMINDER_MESSAGES[Math.floor(Math.random() * REMINDER_MESSAGES.length)];
}

function clearReminderTimer() {
  if (reminderTimer) {
    clearTimeout(reminderTimer);
    reminderTimer = null;
  }
}

function appBase() {
  return self.registration.scope;
}

function iconUrl() {
  return appBase() + "android-chrome-192x192.png";
}

function appUrl() {
  return appBase() + "IntuitiveEating.html";
}

function showReminder(tag) {
  const today = tag.replace("daily-reminder-", "");
  if (reminderState.hasMealToday) return Promise.resolve();
  if (reminderState.notifiedDate === today) return Promise.resolve();
  if (showingReminder) return Promise.resolve();

  showingReminder = true;
  reminderState.notifiedDate = today;
  const message = pickMessage();
  return self.registration
    .showNotification(message, {
      body: "Tap to log today's meal",
      tag: tag,
      renotify: false,
      icon: iconUrl(),
      badge: iconUrl(),
      data: { url: appUrl(), notifiedDate: today },
    })
    .finally(function () {
      showingReminder = false;
    });
}

function scheduleReminder(at, tag) {
  clearReminderTimer();
  pendingReminder = { at: at, tag: tag };
  const delay = at - Date.now();
  if (delay <= 0) {
    const reminder = pendingReminder;
    pendingReminder = null;
    return showReminder(reminder.tag);
  }
  reminderTimer = setTimeout(function () {
    const reminder = pendingReminder;
    pendingReminder = null;
    reminderTimer = null;
    if (reminder) showReminder(reminder.tag);
  }, delay);
}

self.addEventListener("install", function (event) {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", function (event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("message", function (event) {
  const data = event.data;
  if (!data || !data.type) return;

  if (data.type === "SYNC_REMINDER_STATE") {
    reminderState.notifiedDate = data.notifiedDate || "";
    reminderState.hasMealToday = !!data.hasMealToday;
  } else if (data.type === "SCHEDULE_REMINDER") {
    if (data.notifiedDate != null) reminderState.notifiedDate = data.notifiedDate;
    if (data.hasMealToday != null) reminderState.hasMealToday = !!data.hasMealToday;
    scheduleReminder(data.at, data.tag);
  } else if (data.type === "CANCEL_REMINDER") {
    pendingReminder = null;
    clearReminderTimer();
  } else if (data.type === "SHOW_REMINDER") {
    if (data.hasMealToday != null) reminderState.hasMealToday = !!data.hasMealToday;
    showReminder(data.tag);
  }
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || appUrl();
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (windowClients) {
      for (const client of windowClients) {
        if (client.url.indexOf("IntuitiveEating") !== -1 && "focus" in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(url);
      }
    })
  );
});
