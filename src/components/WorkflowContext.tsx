"use client";

import { createContext, useContext, useState } from "react";

type StatusMap = Record<string, string>;

type WorkflowContextType = {
  reconciliationStatuses: StatusMap;
  exceptionStatuses: StatusMap;
  complianceStatuses: StatusMap;
  riskStatuses: StatusMap;

  updateReconciliationStatus: (
    id: string,
    status: string
  ) => void;

  updateExceptionStatus: (
    id: string,
    status: string
  ) => void;

  updateComplianceStatus: (
    id: string,
    status: string
  ) => void;

  updateRiskStatus: (
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
  children: React.ReactNode;
}) {
  const [reconciliationStatuses, setReconciliationStatuses] =
    useState<StatusMap>({});

  const [exceptionStatuses, setExceptionStatuses] =
    useState<StatusMap>({});

  const [complianceStatuses, setComplianceStatuses] =
    useState<StatusMap>({});

  const [riskStatuses, setRiskStatuses] =
    useState<StatusMap>({});

  const updateReconciliationStatus = (
    id: string,
    status: string
  ) => {
    setReconciliationStatuses((current) => ({
      ...current,
      [id]: status,
    }));
  };

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

  const updateRiskStatus = (
    id: string,
    status: string
  ) => {
    setRiskStatuses((current) => ({
      ...current,
      [id]: status,
    }));
  };

  return (
    <WorkflowContext.Provider
      value={{
        reconciliationStatuses,
        exceptionStatuses,
        complianceStatuses,
        riskStatuses,
        updateReconciliationStatus,
        updateExceptionStatus,
        updateComplianceStatus,
        updateRiskStatus,
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