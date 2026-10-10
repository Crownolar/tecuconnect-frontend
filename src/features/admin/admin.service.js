import { adminDashboard, adminUsers, adminCatalog } from "./admin.mock";
import { apiClient } from "../../services/api/apiClient";

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === "true";

const unwrapData = (response) => response?.data ?? response;

const unwrapListResponse = (response) => {
  const data = unwrapData(response);

  return {
    items: Array.isArray(data) ? data : [],
    meta: response?.meta ?? null,
  };
};

const normalizeStudent = (student) => ({
  ...student,

  name:
    student?.name ||
    [student?.firstName, student?.lastName].filter(Boolean).join(" ") ||
    student?.email ||
    "Unnamed student",

  maturityLevel:
    student?.maturityLevel ||
    student?.currentMaturityLabel ||
    student?.currentMaturityLevel ||
    "—",

  progress: student?.progress ?? student?.progressPct ?? 0,

  status: student?.status || (student?.isActive ? "ACTIVE" : "INACTIVE"),

  department: student?.department,

  faculty: student?.faculty,
});

const normalizeStudentDetail = (student) => {
  if (!student) return null;

  const user = student.user ?? {};
  const department = student.department ?? {};
  const faculty = department.faculty ?? {};
  const summary = student.summary ?? {};

  const firstName = user.firstName || "";

  const lastName = user.lastName || "";

  return {
    ...student,

    name:
      summary.name ||
      [firstName, lastName].filter(Boolean).join(" ") ||
      "Unnamed student",

    firstName,
    lastName,

    email: summary.email || user.email || "—",

    phone: user.phone || "—",

    matricNumber: student.matricNumber || summary.matricNumber || "—",

    degreeProgramme: student.degreeProgramme || "—",

    level: student.level || "—",

    gender: student.gender || "—",

    faculty: faculty.name || summary.faculty || "—",

    department: department.name || summary.department || "—",

    maturityLevel:
      summary.currentMaturityLabel || student.currentMaturityLevel || "—",

    progress: summary.progressPct ?? 0,

    teis: summary.teisScore ?? student.teisScore ?? "—",

    currentMaturityLevel:
      student.currentMaturityLevel || summary.currentMaturityLevel || null,

    currentTrlLevel: student.currentTrlLevel || null,

    attendanceRate: summary.attendanceRate ?? null,

    milestonesVerified: summary.milestonesVerified ?? 0,

    milestonesPending: summary.milestonesPending ?? 0,

    skillsAssessed: summary.skillsAssessed ?? 0,

    mentorshipSessions: summary.mentorshipSessions ?? 0,

    lastActivity: summary.lastActivity ?? null,
  };
};

const normalizeMentor = (mentor) => ({
  ...mentor,

  name:
    mentor?.name ||
    [mentor?.user?.firstName, mentor?.user?.lastName]
      .filter(Boolean)
      .join(" ") ||
    mentor?.email ||
    mentor?.user?.email ||
    "Unnamed mentor",

  email: mentor?.email || mentor?.user?.email || "—",

  department:
    typeof mentor?.department === "object"
      ? mentor.department?.name
      : mentor?.department || "—",

  status:
    mentor?.status || (mentor?.isActive === false ? "INACTIVE" : "ACTIVE"),
});

const normalizeAuditLog = (log) => {
  const user = log?.user ?? {};

  return {
    ...log,

    userName:
      user?.name ||
      [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
      user?.fullName ||
      user?.email ||
      log?.userId ||
      "System",

    userEmail: user?.email || "—",

    userId: log?.userId || user?.id || "—",

    action: log?.action || "—",

    entity: log?.entity || "—",

    entityId: log?.entityId || "—",

    ipAddress: log?.ipAddress || "—",
  };
};

export const adminService = {
  async getDashboard() {
    if (USE_MOCK_API) {
      return adminDashboard;
    }

    const [studentsResult, mentorsResult, catalogResult, assessmentsResult] =
      await Promise.allSettled([
        apiClient.get("/students", {
          params: {
            page: 1,
            limit: 100,
          },
        }),

        apiClient.get("/mentors", {
          params: {
            page: 1,
            limit: 100,
          },
        }),

        Promise.all([
          apiClient.get("/faculties", {
            params: {
              page: 1,
              limit: 100,
            },
          }),

          apiClient.get("/departments", {
            params: {
              page: 1,
              limit: 100,
            },
          }),

          apiClient.get("/skills", {
            params: {
              page: 1,
              limit: 100,
              includeInactive: true,
            },
          }),
        ]),

        apiClient.get("/assessments", {
          params: {
            page: 1,
            limit: 100,
          },
        }),
      ]);

    const students =
      studentsResult.status === "fulfilled"
        ? unwrapListResponse(studentsResult.value)
        : {
            items: [],
            meta: null,
          };

    const mentors =
      mentorsResult.status === "fulfilled"
        ? unwrapListResponse(mentorsResult.value)
        : {
            items: [],
            meta: null,
          };

    let faculties = [];
    let departments = [];
    let skills = [];

    if (catalogResult.status === "fulfilled") {
      const [facultiesResponse, departmentsResponse, skillsResponse] =
        catalogResult.value;

      faculties = unwrapListResponse(facultiesResponse).items;

      departments = unwrapListResponse(departmentsResponse).items;

      skills = unwrapListResponse(skillsResponse).items;
    }

    const assessments =
      assessmentsResult.status === "fulfilled"
        ? unwrapListResponse(assessmentsResult.value)
        : {
            items: [],
            meta: null,
          };

    const studentCount = students.meta?.total ?? students.items.length;

    const mentorCount = mentors.meta?.total ?? mentors.items.length;

    const facultyCount = faculties.length;
    const departmentCount = departments.length;
    const skillCount = skills.length;

    const assessmentCount = assessments.meta?.total ?? assessments.items.length;

    const activeStudents = students.items.filter(
      (student) =>
        String(student?.status || "").toUpperCase() === "ACTIVE" ||
        student?.isActive === true,
    ).length;

    const activeMentors = mentors.items.filter(
      (mentor) => mentor?.isActive !== false,
    ).length;

    const completedAssessments = assessments.items.filter(
      (assessment) => assessment?.assessedAt || assessment?.score !== undefined,
    ).length;

    return {
      totalStudents: studentCount,
      activeStudents,

      totalMentors: mentorCount,
      activeMentors,

      totalFaculties: facultyCount,
      totalDepartments: departmentCount,
      totalSkills: skillCount,

      totalAssessments: assessmentCount,
      completedAssessments,

      dataSources: {
        students: studentsResult.status === "fulfilled",

        mentors: mentorsResult.status === "fulfilled",

        catalog: catalogResult.status === "fulfilled",

        assessments: assessmentsResult.status === "fulfilled",
      },
    };
  },

  async getUsers() {
    if (USE_MOCK_API) return adminUsers;

    const [studentsResult, mentorsResult] = await Promise.allSettled([
      apiClient.get("/students", { params: { page: 1, limit: 100 } }),
      apiClient.get("/mentors", { params: { page: 1, limit: 100 } }),
    ]);

    const students =
      studentsResult.status === "fulfilled"
        ? unwrapListResponse(studentsResult.value).items.map(normalizeStudent)
        : [];
    const mentors =
      mentorsResult.status === "fulfilled"
        ? unwrapListResponse(mentorsResult.value).items.map(normalizeMentor)
        : [];

    if (
      studentsResult.status === "rejected" &&
      mentorsResult.status === "rejected"
    ) {
      throw (
        studentsResult.reason ||
        mentorsResult.reason ||
        new Error("Unable to load user accounts.")
      );
    }

    return [
      ...students.map((student) => ({
        id: student.id,
        name: student.name,
        email: student.email,
        role: "STUDENT",
        status: student.status,
        lastLogin: student.lastActivity || "—",
      })),
      ...mentors.map((mentor) => ({
        id: mentor.id,
        name: mentor.name,
        email: mentor.email,
        role: "MENTOR",
        status: mentor.isActive === false ? "INACTIVE" : "ACTIVE",
        lastLogin: "—",
      })),
    ];
  },

  async getStudents(params = {}) {
    const response = await apiClient.get("/students", {
      params: {
        page: 1,
        limit: 100,
        ...params,
      },
    });

    return unwrapListResponse(response).items.map(normalizeStudent);
  },

  async getStudent(studentId) {
    const response = await apiClient.get(`/students/${studentId}`);

    const student = unwrapData(response);

    return normalizeStudentDetail(student);
  },

  async getCatalog() {
    if (USE_MOCK_API) return adminCatalog;

    const [facultiesResponse, departmentsResponse, skillsResponse] =
      await Promise.all([
        apiClient.get("/faculties", { params: { page: 1, limit: 100 } }),
        apiClient.get("/departments", { params: { page: 1, limit: 100 } }),
        apiClient.get("/skills", {
          params: { page: 1, limit: 100, includeInactive: true },
        }),
      ]);

    const faculties = unwrapListResponse(facultiesResponse).items;
    const departments = unwrapListResponse(departmentsResponse).items;
    const skills = unwrapListResponse(skillsResponse).items;

    return { faculties, departments, skills };
  },

  async getMentors(params = {}) {
    if (USE_MOCK_API) return [];
    const response = await apiClient.get("/mentors", {
      params: { page: 1, limit: 100, ...params },
    });
    return unwrapListResponse(response).items.map(normalizeMentor);
  },

  async createMentor(payload) {
    return apiClient.post("/mentors", payload);
  },

  async updateMentor(mentorId, payload) {
    return apiClient.patch(`/mentors/${mentorId}`, payload);
  },

  async deactivateMentor(mentorId, reason) {
    return apiClient.delete(`/mentors/${mentorId}`, {
      body: JSON.stringify({ reason }),
    });
  },

  async assignMentor({ mentorId, studentId }) {
    return apiClient.post("/mentors/assign", { mentorId, studentId });
  },

  async endMentorAssignment(assignmentId, reason) {
    return apiClient.patch(`/mentors/assignments/${assignmentId}/end`, {
      reason,
    });
  },

  async createSkill(payload) {
    return apiClient.post("/skills", payload);
  },

  async updateSkill(skillId, payload) {
    return apiClient.patch(`/skills/${skillId}`, payload);
  },

  async addSkillCompetency(skillId, payload) {
    return apiClient.post(`/skills/${skillId}/competencies`, payload);
  },

  // async getStudent(studentId) {
  //   const response = await apiClient.get(`/students/${studentId}`);
  //   return unwrapData(response);
  // },

  async getAssessments(params = {}) {
    const response = await apiClient.get("/assessments", {
      params: {
        page: 1,
        limit: 100,
        ...params,
      },
    });

    return unwrapListResponse(response);
  },

  async getMaturityOverrideStats() {
    const response = await apiClient.get("/maturity-overrides/stats");

    return unwrapData(response);
  },

  async getMaturityOverrides(params = {}) {
    const response = await apiClient.get("/maturity-overrides", {
      params: {
        page: 1,
        limit: 20,
        ...params,
      },
    });

    return unwrapListResponse(response);
  },

  async createMaturityOverride(payload) {
    const response = await apiClient.post("/maturity-overrides", payload);

    return unwrapData(response);
  },

  async approveMaturityOverride(overrideId, reviewNote = "") {
    const response = await apiClient.patch(
      `/maturity-overrides/${overrideId}/approve`,
      {
        reviewNote,
      },
    );

    return unwrapData(response);
  },

  async rejectMaturityOverride(overrideId, reviewNote = "") {
    const response = await apiClient.patch(
      `/maturity-overrides/${overrideId}/reject`,
      {
        reviewNote,
      },
    );

    return unwrapData(response);
  },

  async getAuditLogs(params = {}) {
    const response = await apiClient.get("/audit-logs", {
      params: {
        page: 1,
        limit: 20,
        ...params,
      },
    });

    const result = unwrapListResponse(response);

    return {
      ...result,
      items: result.items.map(normalizeAuditLog),
    };
  },
};
