/**
 * =====================================================================
 *  حالت دمو — درگاه کامل جایگزینِ API واقعی
 * ---------------------------------------------------------------------
 *  وقتی REACT_APP_DEMO_MODE فعال باشد، همه‌ی درخواست‌های api.js به این
 *  ماژول هدایت می‌شوند و داده‌ی ساختگیِ فارسیِ «واضحاً جعلی» برمی‌گردد.
 *
 *  هیچ اطلاعات واقعی (نام، شماره تلفن یا آدرس) در این داده‌ها وجود ندارد.
 * =====================================================================
 */

const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

function toPersianNumber(n) {
  return String(n)
    .split("")
    .map((d) => PERSIAN_DIGITS[Number(d)] ?? d)
    .join("");
}

const ORDER_WORDS = [
  "یکم", "دوم", "سوم", "چهارم", "پنجم", "ششم", "هفتم", "هشتم",
  "نهم", "دهم", "یازدهم", "دوازدهم", "سیزدهم", "چهاردهم", "پانزدهم",
];

/* ----------------------------------------------------------- تاریخ */
function iso(daysFromToday) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromToday);
  return d.toISOString().slice(0, 10);
}
function clockTime(baseMinutes) {
  const h = String(Math.floor(baseMinutes / 60)).padStart(2, "0");
  const m = String(baseMinutes % 60).padStart(2, "0");
  return `${h}:${m}`;
}

/* =====================================================================
 *  نمونه‌حساب‌های ورود (mock) — بدون هیچ حساب واقعی
 * ===================================================================== */
export const demoAccounts = {
  admin: {
    username: "09120000000",
    password: "demo1234",
    label: "مدیریت",
  },
  secretary: {
    username: "09120000001",
    password: "demo1234",
    label: "منشی",
  },
  teacher: {
    username: "09120000002",
    password: "demo1234",
    label: "استاد",
  },
  student: {
    username: "09120000010",
    password: "demo1234",
    label: "دانش‌آموز",
  },
};

/* =====================================================================
 *  داده‌های پایه (in-memory)
 * ===================================================================== */

// ---------------------------- کاربران -------------------------------
let idCounter = 1000;
const nextId = () => ++idCounter;

function makeUser(fields) {
  return {
    id: nextId(),
    is_active: true,
    date_joined: iso(-400),
    profile_image: null,
    ...fields,
  };
}

const adminUser = makeUser({
  first_name: "مدیر",
  last_name: "نمونه",
  username: "09120000000",
  phone_number: "09120000000",
  parent_phone: "09120000000",
  role: "admin",
  email: "admin@demo.example",
});

const secretaryUsers = [1].map((i) =>
  makeUser({
    first_name: "منشی",
    last_name: `نمونه ${toPersianNumber(i)}`,
    username: "09120000001",
    phone_number: "09120000001",
    parent_phone: "09120000001",
    role: "secretary",
  }),
);

const teacherUsers = [1, 2, 3, 4].map((i) =>
  makeUser({
    first_name: "استاد",
    last_name: `نمونه ${toPersianNumber(i)}`,
    username: `0912000000${i + 1}`,
    phone_number: `0912000000${i + 1}`,
    parent_phone: `0912000000${i + 1}`,
    role: "teacher",
  }),
);

const studentUsers = Array.from({ length: 14 }, (_, idx) => {
  const i = idx + 1;
  const padded = String(10 + idx).padStart(2, "0");
  return makeUser({
    first_name: "دانش‌آموز",
    last_name: `نمونه ${ORDER_WORDS[idx]}`,
    username: `091200000${padded}`,
    phone_number: `091200000${padded}`,
    parent_phone: `091300000${padded}`,
    role: "student",
    email: `student${i}@demo.example`,
  });
});

const users = [adminUser, ...secretaryUsers, ...teacherUsers, ...studentUsers];

// ---------------------------- ترم‌ها --------------------------------
const terms = [
  {
    id: nextId(),
    title: "ترم نمونه تابستان",
    start_date: iso(-30),
    end_date: iso(60),
    is_active: true,
    description: "ترم جاری نمونه — داده جعلی",
  },
  {
    id: nextId(),
    title: "ترم نمونه بهار",
    start_date: iso(-140),
    end_date: iso(-45),
    is_active: false,
    description: "ترم قبل نمونه — داده جعلی",
  },
];

// ---------------------------- کلاس‌ها -------------------------------
const classroomDefs = [
  { name: "کلاس نمونه مقدماتی ۱", level: "مقدماتی", teacher: 0, fee: 1500000, cap: 12 },
  { name: "کلاس نمونه مقدماتی ۲", level: "مقدماتی", teacher: 1, fee: 1500000, cap: 12 },
  { name: "کلاس نمونه متوسط ۱", level: "متوسط", teacher: 2, fee: 1800000, cap: 10 },
  { name: "کلاس نمونه متوسط ۲", level: "متوسط", teacher: 2, fee: 1800000, cap: 10 },
  { name: "کلاس نمونه پیشرفته ۱", level: "پیشرفته", teacher: 3, fee: 2200000, cap: 8 },
  { name: "کلاس نمونه آیلتس", level: "IELTS", teacher: 3, fee: 3500000, cap: 8 },
];

const classrooms = classroomDefs.map((def, i) => {
  const teacher = teacherUsers[def.teacher];
  return {
    id: nextId(),
    name: def.name,
    capacity: def.cap,
    student_count: 0, // بعداً محاسبه می‌شود
    tuition_fee: def.fee,
    level: def.level,
    description: `کلاس نمونه سطح ${def.level} — داده جعلی`,
    term: terms[0].id,
    term_detail: { ...terms[0] },
    teacher: teacher.id,
    teacher_detail: { ...teacher, profile_image: null },
    sessions_per_week: 2,
    start_time: clockTime(480 + i * 60),
    is_active: true,
  };
});

// ---------------------------- ثبت‌نام‌ها -----------------------------
const enrollments = [];
studentUsers.forEach((student, idx) => {
  const cls = classrooms[idx % classrooms.length];
  enrollments.push({
    id: nextId(),
    student: student.id,
    student_detail: { ...student },
    classroom: cls.id,
    classroom_detail: { ...cls },
    is_active: true,
    is_term_active: true,
    is_paid: idx % 3 !== 0,
    paid_at: idx % 3 !== 0 ? iso(-10) : null,
    tuition_fee: cls.tuition_fee,
  });
});
classrooms.forEach((cls) => {
  cls.student_count = enrollments.filter((e) => e.classroom === cls.id).length;
});

// ---------------------------- جلسات و حضور ---------------------------
const sessions = [];
classrooms.forEach((cls) => {
  cls.enrollment_ids = []; // برای دسترسی سریع
});

const sessionsPerClass = 3;
classrooms.forEach((cls) => {
  for (let s = 0; s < sessionsPerClass; s++) {
    const session = {
      id: nextId(),
      classroom: cls.id,
      classroom_detail: { ...cls },
      date: iso(s * 4 - 8),
      session_date: iso(s * 4 - 8),
      start_time: cls.start_time,
      end_time: clockTime(
        (Number(cls.start_time.split(":")[0]) + 1) * 60,
      ),
      description: s === 0 ? "جلسه نمونه اول" : null,
      status: s === 0 ? "pending" : "held",
    };
    sessions.push(session);
  }
});

const STATUS_CYCLE = ["present", "absent", "present", "late", "present", "excused"];
const attendanceRecords = [];
const clsSessions = {};
sessions.forEach((session) => {
  (clsSessions[session.classroom] ||= []).push(session);
});
objectEntries(clsSessions).forEach(([classroomId, clsSessionList]) => {
  const clsEnroll = enrollments.filter((e) => e.classroom === Number(classroomId));
  clsSessionList.forEach((session) => {
    let statusIndex = 0;
    clsEnroll.forEach((enrollment) => {
      const isPast = new Date(session.date) < new Date();
      const status = isPast && session.status !== "pending"
        ? STATUS_CYCLE[statusIndex++ % STATUS_CYCLE.length]
        : null;
      attendanceRecords.push({
        id: nextId(),
        session: session.id,
        session_detail: { ...session },
        enrollment: enrollment.id,
        enrollment_detail: { ...enrollment },
        student: enrollment.student,
        student_detail: { ...enrollment.student_detail },
        classroom: enrollment.classroom,
        status: isPast ? status : "pending",
        is_present: isPast
          ? ["present", "late"].includes(status)
          : null,
        note: null,
        description: null,
      });
    });
  });
});

// ---------------------------- امتحانات -------------------------------
const exams = [];
const examDefs = [
  {
    title: "آزمون نمونه پایان فصل ۱",
    classroomIndex: 0,
    questionCount: 4,
    daysFromNow: 3,
    state: "active",
  },
  {
    title: "آزمون نمونه واژگان",
    classroomIndex: 2,
    questionCount: 4,
    daysFromNow: -5,
    state: "graded",
  },
  {
    title: "آزمون نمونه گرامر میانی",
    classroomIndex: 4,
    questionCount: 3,
    daysFromNow: 6,
    state: "scheduled",
  },
];
const questions = [];
examDefs.forEach((def, examIdx) => {
  const cls = classrooms[def.classroomIndex];
  const examDate = iso(def.daysFromNow);
  const exam = {
    id: nextId(),
    exam_title: def.title,
    exam_description: `آزمون نمونه ${toPersianNumber(examIdx + 1)} — داده جعلی`,
    classroom: cls.id,
    classroom_detail: { ...cls },
    date: examDate,
    time: clockTime(510 + examIdx * 45),
    duration_minutes: 45,
    state: def.state, // state فعلی
    status: def.state === "graded" ? "graded" : def.state === "scheduled" ? "scheduled" : "active",
    is_active: def.state !== "graded",
    questions: [],
  };
  const examQuestionTypes = ["multiple_choice", "essay", "multiple_choice", "essay"];
  for (let q = 0; q < def.questionCount; q++) {
    const qType = examQuestionTypes[q % examQuestionTypes.length];
    const qId = nextId();
    const question = {
      id: qId,
      exam: exam.id,
      exam_detail: undefined,
      question_text: `سوال نمونه ${toPersianNumber(q + 1)} درباره‌ی واژگان درس — داده جعلی`,
      text: `سوال نمونه ${toPersianNumber(q + 1)} درباره‌ی واژگان درس — داده جعلی`,
      question_type: qType,
      choices: [],
      max_score: 2,
      score: 2,
      order: q + 1,
    };

    if (qType === "multiple_choice") {
      [1, 2, 3, 4].forEach((choiceIdx) => {
        question.choices.push({
          id: nextId(),
          question: qId,
          text: `گزینه نمونه ${toPersianNumber(choiceIdx)}`,
          is_correct: choiceIdx === 1,
          order: choiceIdx,
        });
      });
    }

    exam.questions.push(question);
    questions.push(question);
  }
  exams.push(exam);
});

const submissions = [];
const answers = [];

// پاسخ‌های نمونه برای آزمون‌های «نمره‌گذاری‌شده» قبلی
exams
  .filter((exam) => exam.state === "graded")
  .forEach((exam) => {
    const clsEnroll = enrollments.filter((e) => e.classroom === exam.classroom);
    clsEnroll.forEach((enrollment, idx) => {
      const submission = {
        id: nextId(),
        exam: exam.id,
        exam_detail: { ...exam, questions: undefined },
        student: enrollment.student,
        student_detail: { ...enrollment.student_detail },
        total_score: null,
        state: "graded",
        submitted_at: iso(-4),
      };
      let answerTotal = 0;
      exam.questions.forEach((question, qIdx) => {
        const isMc = question.question_type === "multiple_choice";
        if (isMc) {
          const chose = question.choices[idx % 2 === 0 ? 0 : 1];
          answerTotal += chose?.is_correct ? question.max_score : 0;
          answers.push({
            id: nextId(),
            submission: submission.id,
            question: question.id,
            selected_choice: chose?.id,
            essay_text: null,
          });
        } else {
          answerTotal += idx % 2 === 0 ? question.max_score : 0;
          answers.push({
            id: nextId(),
            submission: submission.id,
            question: question.id,
            selected_choice: null,
            essay_text: "پاسخ نمونه دانش‌آموز — داده جعلی.",
          });
        }
      });
      submission.total_score = answerTotal;
      submissions.push(submission);
    });
  });

function objectEntries(obj) {
  return Object.entries(obj);
}

/* =====================================================================
 *  پاسخ‌دهنده‌ی عمومی درخواست‌ها
 * ===================================================================== */

function clone(value) {
  return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
}

class ApiError extends Error {
  constructor(status, data) {
    super(
      (data && data.detail) || "خطا در ارتباط با سرور",
    );
    this.status = status;
    this.data = data;
  }
}

function loginHandler(body) {
  const username = String(body?.username || "").trim();
  const password = String(body?.password || "");

  const validAccount = Object.values(demoAccounts).find(
    (acc) => acc.username === username && acc.password === password,
  );

  if (!validAccount) {
    throw new ApiError(400, {
      detail: "در حالت دمو فقط با حساب‌های نمونه وارد شوید (مثلاً 09120000000 با رمز demo1234).",
    });
  }

  const user = users.find((u) => u.username === username) || adminUser;

  return {
    token: `demo-token-${user.role}-${user.id}`,
    user: clone(user),
  };
}

/* ---------------- مسیریابی درخواست‌ها ---------------- */
export async function demoRequest(path, options = {}) {
  const method = (options.method || "GET").toUpperCase();
  const body = typeof options.body === "string" ? JSON.parse(options.body) : null;

  // شبیه‌سازی کم‌ترین تاخیر شبکه
  await new Promise((resolve) => setTimeout(resolve, 180));

  const routes = [
    {
      match: () => path.includes("/accounts/login/") && method === "POST",
      handler: () => loginHandler(body),
    },

    /* -------------------------------------------------- کاربران */
    {
      match: () => path.includes("/accounts/users/"),
      handler: () => crudHandler(users, path, method, body, "user"),
    },

    /* -------------------------------------------------- ترم‌ها */
    {
      match: () => path.includes("/classes/terms/"),
      handler: () => crudHandler(terms, path, method, body, "term"),
    },

    /* -------------------------------------------------- کلاس‌ها */
    {
      match: () => path.includes("/classes/classrooms/"),
      handler: () => crudHandler(classrooms, path, method, body, "classroom"),
    },

    /* -------------------------------------------------- ثبت‌نام */
    {
      match: () => path.includes("/classes/enrollments/"),
      handler: () => crudHandler(enrollments, path, method, body, "enrollment"),
    },

    /* -------------------------------------------------- جلسات */
    {
      match: () => path.includes("/attendance/sessions/"),
      handler: () => crudHandler(sessions, path, method, body, "session"),
    },

    /* -------------------------------------------------- حضور و غیاب */
    {
      match: () => path.includes("/attendance/records/"),
      handler: () => crudHandler(attendanceRecords, path, method, body, "attendance"),
    },

    /* -------------------------------------------------- امتحانات */
    {
      match: () =>
        path.includes("/exams/exams/") && path.includes("student_view"),
      handler: () => {
        const examId = Number(path.match(/\/(\d+)\/student_view/)?.[1]);
        const exam = exams.find((e) => e.id === examId);
        if (!exam) throw new ApiError(404, { detail: "آزمون نمونه یافت نشد." });

        const examQuestions = exam.questions || [];
        return {
          exam: clone(exam),
          questions: clone(examQuestions),
        };
      },
    },
    {
      match: () => path.includes("/exams/exams/"),
      handler: () => crudHandler(exams, path, method, body, "exam"),
    },

    /* -------------------------------------------------- سوالات */
    {
      match: () => path.includes("/exams/questions/"),
      handler: () =>
        crudHandler(questions, path, method, body, "question", (created) => {
          const parentExam = exams.find((e) => e.id === created.exam);
          if (parentExam && !parentExam.questions.some((q) => q.id === created.id)) {
            parentExam.questions.push(clone(created));
          }
        }),
    },

    /* -------------------------------------------------- پاسخ برگه‌ها */
    {
      match: () =>
        path.includes("/exams/submissions/") && path.includes("grade"),
      handler: () => {
        const subId = Number(path.match(/\/(\d+)\/grade/)?.[1]);
        const submission = submissions.find((s) => s.id === subId);
        if (!submission) throw new ApiError(404, { detail: "برگه نمونه یافت نشد." });

        // نمره‌ی خودکار ساده: پاسخ تستی درست = نمره کامل
        let total = 0;
        (answers || [])
          .filter((a) => a.submission === subId)
          .forEach((a) => {
            const q = questions.find((qq) => qq.id === a.question);
            if (!q) return;
            const chosen = q.choices?.find((c) => c.id === a.selected_choice);
            if (q.question_type === "multiple_choice" && chosen?.is_correct) {
              total += Number(q.max_score) || 1;
            } else if (q.question_type === "essay" && (a.essay_text || "").length > 10) {
              total += Number(q.max_score) || 1;
            }
          });

        submission.total_score = total;
        submission.state = "graded";
        return clone(submission);
      },
    },
    {
      match: () => path.includes("/exams/submissions/"),
      handler: () =>
        crudHandler(submissions, path, method, body, "submission", (created) => {
          created.state = created.state || "submitted";
        }),
    },

    /* -------------------------------------------------- پاسخ‌های سوال */
    {
      match: () => path.includes("/exams/answers/"),
      handler: () => crudHandler(answers, path, method, body, "answer"),
    },
  ];

  const route = routes.find((r) => r.match());

  if (!route) {
    throw new ApiError(404, {
      detail: `در حالت دمو، درخواست «${path}» پشتیبانی نمی‌شود.`,
    });
  }

  return route.handler();
}

function crudHandler(collection, path, method, body, entityName, onCreated) {
  const collectionName = entityName;

  const idMatch = path.match(/\/(\d+)\/?$/);
  if (!idMatch) {
    switch (method) {
      case "GET": {
        return clone(collection);      }
      case "POST": {
        const created = {
          id: nextId(),
          ...body,
        };
        collection.push(created);
        onCreated && onCreated(created);

        if (collectionName === "classroom") {
          // بازمحاسبه‌ی تعداد دانش‌آموز کلاس‌ها
          classrooms.forEach(
            (cls) =>
              (cls.student_count = enrollments.filter(
                (e) => e.classroom === cls.id,
              ).length),
          );
        }
        if (collectionName === "enrollment") {
          decorateEnrollment(created);
        }
        if (collectionName === "user") {
          decorateUser(created);
        }
        return clone(created);
      }
      default:
        throw new ApiError(405, { detail: "متد پشتیبانی نمی‌شود." });
    }
  }

  const id = Number(idMatch[1]);
  const indexIn = collection.findIndex(
    (item) => Number(item.id) === id,
  );
  if (indexIn === -1) {
    throw new ApiError(404, { detail: `${collectionName} ${id} یافت نشد.` });
  }

  switch (method) {
    case "GET":
      return clone(collection[indexIn]);
    case "PATCH":
    case "PUT": {
      const updated = {
        ...collection[indexIn],
        ...(body || {}),
        id,
      };
      collection[indexIn] = updated;

      if (collectionName === "classroom") {
        enrollments
          .filter((e) => e.classroom === id)
          .forEach((e) => {
            e.classroom_detail = { ...updated };
            e.is_term_active = updated.is_active ?? e.is_term_active;
          });
        classrooms.forEach(
          (cls) =>
            (cls.student_count = enrollments.filter(
              (e) => e.classroom === cls.id,
            ).length),
        );
      }
      if (collectionName === "session") {
        attendanceRecords
          .filter((r) => r.session === id)
          .forEach((r) => (r.session_detail = { ...updated }));
      }
      if (collectionName === "enrollment") {
        decorateEnrollment(updated);
      }
      if (collectionName === "user") {
        decorateUser(updated);
      }

      return clone(collection[indexIn]);
    }
    case "DELETE": {
      collection.splice(indexIn, 1);

      if (collectionName === "user") {
        // حذف وابستگی‌های ساده
        const dependentEnrollIds = enrollments
          .filter((e) => e.student === id)
          .map((e) => e.id);
      for (let i = enrollments.length - 1; i >= 0; i--) {
                if (dependentEnrollIds.includes(enrollments[i].id)) {
                  enrollments.splice(i, 1);
                }
        }
      }

      return null;
    }
    default:
      throw new ApiError(405, { detail: "متد پشتیبانی نمی‌شود." });
  }
}

function decorateEnrollment(enrollment) {
  if (!enrollment.student_detail && enrollment.student) {
    const student = users.find((u) => u.id === Number(enrollment.student));
    if (student) {
      enrollment.student_detail = clone(student);
      enrollment.student = student.id;
    }
  }
  if (!enrollment.classroom_detail && enrollment.classroom) {
    const cls = classrooms.find((c) => c.id === Number(enrollment.classroom));
    if (cls) {
      enrollment.classroom_detail = clone(cls);
      enrollment.classroom = cls.id;
      enrollment.tuition_fee = cls.tuition_fee;
    }
  }
  classrooms.forEach(
    (cls) =>
      (cls.student_count = enrollments.filter(
        (e) => e.classroom === cls.id,
      ).length),
  );
}

function decorateUser(user) {
  if (!user.parent_phone && user.phone_number) {
    user.parent_phone = user.phone_number;
  }
}

/* helper: ثبت پاسخ در آرایه‌ی عمومی answers هنگام ساخت */
export function registerAnswer(answer) {
  answers.push(answer);
}

export function demoDataStats() {
  return {
    users: users.length,
    terms: terms.length,
    classrooms: classrooms.length,
    enrollments: enrollments.length,
    sessions: sessions.length,
    attendanceRecords: attendanceRecords.length,
    exams: exams.length,
    questions: questions.length,
    submissions: submissions.length,
  };
}

export function getFullNameCopy(user) {
  if (!user) return "کاربر نمونه";
  const fullName = `${user.first_name || ""} ${user.last_name || ""}`.trim();
  return fullName || user.username || "کاربر نمونه";
}
