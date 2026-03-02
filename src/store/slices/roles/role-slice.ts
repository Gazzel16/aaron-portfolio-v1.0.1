"use client";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/lib/axios";

// Define Role interface
export interface Role {
  id: string;
  role: string;
  created_at: string;
}

export interface RoleCountByDate {
  date: string;
  count: number;
}

export interface RoleRanking {
  role: string;
  count: number;
}

// Define the slice state
interface RoleState {
  roles: Role[];
  roleCountsByDate: RoleCountByDate[];
  roleRankings: RoleRanking[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: RoleState = {
  roles: [],
  roleCountsByDate: [],
  roleRankings: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchRoles = createAsyncThunk("roles/fetchRoles", async () => {
  const response = await api.get<Role[]>("/api/role"); // your FastAPI endpoint
  return response.data;
});

export const fetchHR = createAsyncThunk("roles/fetchHR", async () => {
  const response = await api.get<Role[]>("/api/role/hr");
  return response.data;
});

export const fetchRecruiters = createAsyncThunk(
  "roles/fetchRecruiters",
  async () => {
    const response = await api.get<Role[]>("/api/role/recruiters");
    return response.data;
  },
);

export const fetchViewers = createAsyncThunk("roles/fetchViewers", async () => {
  const response = await api.get<Role[]>("/api/role/viewers");
  return response.data;
});

export const createRole = createAsyncThunk(
  "roles/createRole",
  async (newRole: { name: string; role: string }) => {
    const response = await api.post<Role>("/api/role/", newRole);
    return response.data;
  }
);

export const fetchRolesCountByDate = createAsyncThunk(
  "roles/fetchRolesCountByDate",
  async () => {
    const response = await api.get<RoleCountByDate[]>("/api/role/count-by-date");
    return response.data;
  }
);

export const fetchRolesRanking = createAsyncThunk(
  "roles/fetchRolesRanking",
  async () => {
    const response = await api.get<RoleRanking[]>("/api/role/role-rankings");
    return response.data;
  }
);

export const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all roles
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action: PayloadAction<Role[]>) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch roles";
      })

      // Fetch HR roles
      .addCase(fetchHR.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHR.fulfilled, (state, action: PayloadAction<Role[]>) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(fetchHR.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch HR roles";
      })

      // Fetch Recruiters
      .addCase(fetchRecruiters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchRecruiters.fulfilled,
        (state, action: PayloadAction<Role[]>) => {
          state.loading = false;
          state.roles = action.payload;
        },
      )
      .addCase(fetchRecruiters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch Recruiters";
      })

      // Fetch Viewers
      .addCase(fetchViewers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchViewers.fulfilled,
        (state, action: PayloadAction<Role[]>) => {
          state.loading = false;
          state.roles = action.payload;
        },
      )
      .addCase(fetchViewers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch Viewers";
      })

      // Create role
      .addCase(createRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRole.fulfilled, (state, action: PayloadAction<Role>) => {
        state.loading = false;
        state.roles.push(action.payload);
      })
      .addCase(createRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create role";
      })

      //Count By Date
      .addCase(fetchRolesCountByDate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRolesCountByDate.fulfilled, (state, action: PayloadAction<RoleCountByDate[]>) => {
        state.loading = false;
        state.roleCountsByDate = action.payload;
      })
      .addCase(fetchRolesCountByDate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch roles count by date";
      })

      //Rankings
      .addCase(fetchRolesRanking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRolesRanking.fulfilled, (state, action: PayloadAction<RoleRanking[]>) => {
        state.loading = false;
        state.roleRankings = action.payload;
      })
      .addCase(fetchRolesRanking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch roles ranking";
      });
  },
});

export default roleSlice.reducer;
