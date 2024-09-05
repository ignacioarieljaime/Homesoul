import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AdminLayout from "../../admin/layout/AdminLayout";
import EngineerProfile from "../../admin/pages/engineer/EngineerProfile";
import HomeOwnerDashboard from "../../admin/pages/homeOwner/HomeOwnerDashboard";
import EngineerDashboard from "../../admin/pages/engineer/EngineerDashboard";
import AuditStatus from "../../admin/pages/engineer/AuditStatus";
import ServiceArea from "../../admin/pages/engineer/serviceArea/ServiceArea";
import MyPlan from "../../admin/pages/engineer/myPlan/MyPlan";
import NewAudit from "../../admin/pages/engineer/newAudit/NewAudit";
import AuditHomeDetails from "../../admin/pages/engineer/newAudit/AuditHomeDetails";
import ReviewEcm from "../../admin/pages/engineer/newAudit/ReviewEcm";
import Checkoption from "../../admin/pages/engineer/newAudit/Checkoption";
import PlanOption from "../../admin/pages/engineer/myPlan/PlanOption";
import AuditChecklist from "../../admin/pages/engineer/newAudit/AuditChecklist";
import ErrorPage from "../../admin/pages/error/ErrorPage";
import Categories from "../../admin/pages/homeOwner/Categories";
import Tutorial from "../../admin/pages/homeOwner/Tutorial";
import AuditType from "../../admin/pages/engineer/newAudit/AuditType";
import AuditFileUpload from "../../admin/pages/engineer/newAudit/AuditFileUpload";
import GenerateReport from "../../admin/pages/engineer/newAudit/GenerateReport";
import AdvancedCheckOption from "../../admin/pages/engineer/newAudit/AdvancedCheckOption";
import PropertyList from "../../admin/pages/homeOwner/PropertyList";
import AddHomeDetails from "../../admin/pages/homeOwner/AddHomeDetails";
import AuditPropertyDetails from "../../admin/pages/engineer/newAudit/AuditPropertyDetails";

const adminRoutes = (role) => {
  return (
    <Routes>
      <Route
        path="dashboard"
        element={
          role == "2" ? (
            <AdminLayout>
              <PropertyList />
            </AdminLayout>
          ) : (
            <AdminLayout>
              <EngineerDashboard />
            </AdminLayout>
          )
        }
      />
      <Route
        path="profile"
        element={
          <AdminLayout>
            <EngineerProfile />
          </AdminLayout>
        }
      />
      {role == "2" ? (
        <>
          {/* <Route
            path="categories"
            element={
              <AdminLayout>
                <Categories />
              </AdminLayout>
            }
          />
          <Route
            path="tutorial"
            element={
              <AdminLayout>
                <Tutorial />
              </AdminLayout>
            }
          /> */}
          <Route
            path="dashboard/addHome"
            element={
              <AdminLayout>
                <AddHomeDetails />
              </AdminLayout>
            }
          />
          <Route
            path="dashboard/propertyAssessment"
            element={
              <AdminLayout>
                <HomeOwnerDashboard />
              </AdminLayout>
            }
          />
        </>
      ) : (
        <>
          <Route
            path="service"
            element={
              <AdminLayout>
                <ServiceArea />
              </AdminLayout>
            }
          />
          {/* <Route
            path="my-plan"
            element={
              <AdminLayout>
                <MyPlan />
              </AdminLayout>
            }
          /> */}

          <Route
            path="dashboard/status"
            element={
              <AdminLayout>
                <AuditStatus />
              </AdminLayout>
            }
          />
          <Route
            path="dashboard/audit-type"
            element={
              <AdminLayout>
                <AuditType />
              </AdminLayout>
            }
          />
          <Route
            path="dashboard/audit-upload"
            element={
              <AdminLayout>
                <AuditFileUpload />
              </AdminLayout>
            }
          />
          <Route
            path="dashboard/audit-generate"
            element={
              <AdminLayout>
                <GenerateReport />
              </AdminLayout>
            }
          />
          <Route
            path="dashboard/audit-advanced-checkoption"
            element={
              <AdminLayout>
                <AdvancedCheckOption />
              </AdminLayout>
            }
          />
          <Route
            path="dashboard/newaudit"
            element={
              <AdminLayout>
                <NewAudit />
              </AdminLayout>
            }
          />
          <Route
            path="dashboard/newaudithome"
            element={
              <AdminLayout>
                <AuditHomeDetails />
              </AdminLayout>
            }
          />
          <Route
            path="dashboard/newauditproperty"
            element={
              <AdminLayout>
                <AuditPropertyDetails />
              </AdminLayout>
            }
          />
          <Route
            path="dashboard/reviewecm"
            element={
              <AdminLayout>
                <ReviewEcm />
              </AdminLayout>
            }
          />
          <Route
            path="dashboard/checkoption"
            element={
              <AdminLayout>
                <Checkoption />
              </AdminLayout>
            }
          />

          <Route
            path="dashboard/audit-checklist"
            element={
              <AdminLayout>
                <AuditChecklist />
              </AdminLayout>
            }
          />
        </>
      )}
      <Route
        path="dashboard/planoption"
        element={
          <AdminLayout>
            <PlanOption />
          </AdminLayout>
        }
      />

      {/* Error route */}
      <Route
        path="/error"
        element={
          <AdminLayout>
            <ErrorPage />
          </AdminLayout>
        }
      />

      <Route path="admin/*" element={<Navigate to="/error" />} />
    </Routes>
  );
};

export default adminRoutes;
