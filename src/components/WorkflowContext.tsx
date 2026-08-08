"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type WorkflowContextType = {
  exceptionStatuses: Record<string, string>;
  complianceStatuses: Record<string, string>;
  reconciliationStatuses: Record<string, string>;

  updateExceptionStatus: (
    id: string,
    status: string
  ) => void;

  updateComplianceStatus: (
    id: string,
    status: string
  ) => void;

  updateReconciliationStatus: (
    id: string,
    status: string
  ) => void;
};

const WorkflowContext =
  createContext<WorkflowContextType | undefined>(
    undefined
  );

export function WorkflowProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [exceptionStatuses, setExceptionStatuses] =
    useState<Record<string, string>>({
      EXC001: "Open",
      EXC002: "Under Review",
      EXC003: "Open",
    });

  const [complianceStatuses, setComplianceStatuses] =
    useState<Record<string, string>>({
      CMP001: "Pending Review",
      CMP002: "Reviewing",
      CMP003: "Approved",
    });

  const [reconciliationStatuses, setReconciliationStatuses] =
    useState<Record<string, string>>({
      REC001: "Matched",
      REC002: "Under Review",
      REC003: "Unmatched",
      REC004: "Matched",
      REC005: "Unmatched",
    });

  const updateExceptionStatus = (
    id: string,
    status: string
  ) => {
    setExceptionStatuses((current) => ({
      ...current,
      [id]: status,
    }));
  };

  const updateComplianceStatus = (
    id: string,
    status: string
  ) => {
    setComplianceStatuses((current) => ({
      ...current,
      [id]: status,
    }));
  };

  const updateReconciliationStatus = (
    id: string,
    status: string
  ) => {
    setReconciliationStatuses((current) => ({
      ...current,
      [id]: status,
    }));
  };

  return (
    <WorkflowContext.Provider
      value={{
        exceptionStatuses,
        complianceStatuses,
        reconciliationStatuses,
        updateExceptionStatus,
        updateComplianceStatus,
        updateReconciliationStatus,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
}

export function useWorkflow() {
  const context = useContext(WorkflowContext);

  if (!context) {
    throw new Error(
      "useWorkflow must be used inside WorkflowProvider"
    );
  }

  return context;
}