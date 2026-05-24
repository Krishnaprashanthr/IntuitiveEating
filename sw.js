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
  return self.registration.showNotification("Intuitive Eating", {
    body: pickMessage(),
    tag: tag,
    icon: iconUrl(),
    badge: iconUrl(),
    data: { url: appUrl() },
  });
}

function scheduleReminder(at, tag) {
  clearReminderTimer();
  pendingReminder = { at: at, tag: tag };
  const delay = at - Date.now();
  if (delay <= 0) {
    pendingReminder = null;
    return showReminder(tag);
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

  if (data.type === "SCHEDULE_REMINDER") {
    scheduleReminder(data.at, data.tag);
  } else if (data.type === "CANCEL_REMINDER") {
    pendingReminder = null;
    clearReminderTimer();
  } else if (data.type === "SHOW_REMINDER") {
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
