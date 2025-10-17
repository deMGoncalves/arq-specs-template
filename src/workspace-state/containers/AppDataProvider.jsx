import {
  createContext,
  useCallback,
  useContext,
  useMemo
} from "react";
import { initialData, STORAGE_KEY } from "../modules/initialData.js";
import { useLocalStorage } from "../../shared/modules/hooks/useLocalStorage.js";
import { ensureArray, generateId } from "../../lib/utils.js";

const DataContext = createContext(initialData);
const ActionsContext = createContext({});

function touchMeta(meta = {}) {
  return {
    ...meta,
    lastUpdated: new Date().toISOString()
  };
}

function sanitizeLinks(links = {}) {
  return {
    chapters: ensureArray(links.chapters),
    c4: ensureArray(links.c4),
    bdd: ensureArray(links.bdd)
  };
}

export function AppDataProvider({ children }) {
  const [state, setState] = useLocalStorage(STORAGE_KEY, initialData);

  const updateChapter = useCallback((chapterId, updates) => {
    setState((prev) => {
      const chapters = prev.chapters.map((section) =>
        section.id === chapterId ? { ...section, ...updates } : section
      );

      return {
        ...prev,
        chapters,
        meta: touchMeta(prev.meta)
      };
    });
  }, [setState]);

  const addAdr = useCallback((adrPayload) => {
    setState((prev) => {
      const adr = {
        id: adrPayload.id || generateId("adr"),
        status: "draft",
        date: new Date().toISOString(),
        ...adrPayload,
        links: sanitizeLinks(adrPayload.links)
      };

      return {
        ...prev,
        adrs: [...prev.adrs, adr],
        meta: touchMeta(prev.meta)
      };
    });
  }, [setState]);

  const updateAdr = useCallback((adrId, updates) => {
    setState((prev) => {
      const adrs = prev.adrs.map((adr) =>
        adr.id === adrId
          ? {
              ...adr,
              ...updates,
              links: updates.links ? sanitizeLinks(updates.links) : adr.links
            }
          : adr
      );

      return {
        ...prev,
        adrs,
        meta: touchMeta(prev.meta)
      };
    });
  }, [setState]);

  const removeAdr = useCallback((adrId) => {
    setState((prev) => {
      const adrs = prev.adrs.filter((adr) => adr.id !== adrId);
      const bdd = prev.bdd.map((feature) => ({
        ...feature,
        linkedAdrs: feature.linkedAdrs.filter((id) => id !== adrId)
      }));
      const c4 = {
        ...prev.c4,
        containers: prev.c4.containers.map((container) => ({
          ...container,
          linkedAdrs: container.linkedAdrs.filter((id) => id !== adrId)
        })),
        components: prev.c4.components.map((component) => ({
          ...component,
          linkedAdrs: component.linkedAdrs.filter((id) => id !== adrId)
        }))
      };

      return {
        ...prev,
        adrs,
        bdd,
        c4,
        meta: touchMeta(prev.meta)
      };
    });
  }, [setState]);

  const addFeature = useCallback((payload) => {
    setState((prev) => {
      const feature = {
        id: payload.id || generateId("feature"),
        reference: payload.reference || generateId("feat"),
        scenarios: payload.scenarios?.length
          ? payload.scenarios
          : [
              {
                id: generateId("scenario"),
                title: "Novo cenário",
                given: [],
                when: [],
                then: []
              }
            ],
        linkedChapters: ensureArray(payload.linkedChapters),
        linkedComponents: ensureArray(payload.linkedComponents),
        linkedAdrs: ensureArray(payload.linkedAdrs),
        ...payload
      };

      return {
        ...prev,
        bdd: [...prev.bdd, feature],
        meta: touchMeta(prev.meta)
      };
    });
  }, [setState]);

  const updateFeature = useCallback((featureId, updates) => {
    setState((prev) => {
      const bdd = prev.bdd.map((feature) =>
        feature.id === featureId
          ? {
              ...feature,
              ...updates,
              linkedChapters: updates.linkedChapters
                ? ensureArray(updates.linkedChapters)
                : feature.linkedChapters,
              linkedComponents: updates.linkedComponents
                ? ensureArray(updates.linkedComponents)
                : feature.linkedComponents,
              linkedAdrs: updates.linkedAdrs
                ? ensureArray(updates.linkedAdrs)
                : feature.linkedAdrs
            }
          : feature
      );

      return {
        ...prev,
        bdd,
        meta: touchMeta(prev.meta)
      };
    });
  }, [setState]);

  const removeFeature = useCallback((featureId) => {
    setState((prev) => {
      const bdd = prev.bdd.filter((feature) => feature.id !== featureId);
      const adrs = prev.adrs.map((adr) => ({
        ...adr,
        links: {
          ...adr.links,
          bdd: adr.links.bdd.filter((id) => id !== featureId)
        }
      }));
      const c4 = {
        ...prev.c4,
        containers: prev.c4.containers.map((container) => ({
          ...container,
          linkedFeatures: container.linkedFeatures.filter((id) => id !== featureId)
        })),
        components: prev.c4.components.map((component) => ({
          ...component,
          linkedFeatures: component.linkedFeatures.filter((id) => id !== featureId)
        }))
      };

      return {
        ...prev,
        bdd,
        adrs,
        c4,
        meta: touchMeta(prev.meta)
      };
    });
  }, [setState]);

  const updateC4 = useCallback((updates) => {
    setState((prev) => ({
      ...prev,
      c4: {
        ...prev.c4,
        ...updates
      },
      meta: touchMeta(prev.meta)
    }));
  }, [setState]);

  const upsertC4Container = useCallback((container) => {
    setState((prev) => {
      const exists = prev.c4.containers.some((item) => item.id === container.id);
      const containerWithDefaults = {
          linkedChapters: ensureArray(container.linkedChapters),
        linkedAdrs: ensureArray(container.linkedAdrs),
        linkedFeatures: ensureArray(container.linkedFeatures),
        ...container,
        id: container.id || generateId("container")
      };
      const containers = exists
        ? prev.c4.containers.map((item) =>
            item.id === containerWithDefaults.id
              ? { ...item, ...containerWithDefaults }
              : item
          )
        : [...prev.c4.containers, containerWithDefaults];

      return {
        ...prev,
        c4: {
          ...prev.c4,
          containers
        },
        meta: touchMeta(prev.meta)
      };
    });
  }, [setState]);

  const removeC4Container = useCallback((containerId) => {
    setState((prev) => {
      const containers = prev.c4.containers.filter(
        (item) => item.id !== containerId
      );
      const removedComponentIds = prev.c4.components
        .filter((component) => component.containerId === containerId)
        .map((component) => component.id);
      const components = prev.c4.components.filter(
        (component) => component.containerId !== containerId
      );
      const adrs = prev.adrs.map((adr) => ({
        ...adr,
        links: {
          ...adr.links,
          c4: adr.links.c4.filter(
            (id) => id !== containerId && !removedComponentIds.includes(id)
          )
        }
      }));
      const bdd = prev.bdd.map((feature) => ({
        ...feature,
        linkedComponents: feature.linkedComponents.filter(
          (id) => !removedComponentIds.includes(id)
        )
      }));

      return {
        ...prev,
        c4: {
          ...prev.c4,
          containers,
          components
        },
        adrs,
        bdd,
        meta: touchMeta(prev.meta)
      };
    });
  }, [setState]);

  const upsertC4Component = useCallback((component) => {
    setState((prev) => {
      const componentWithDefaults = {
        linkedChapters: ensureArray(component.linkedChapters),
        linkedAdrs: ensureArray(component.linkedAdrs),
        linkedFeatures: ensureArray(component.linkedFeatures),
        ...component,
        id: component.id || generateId("component")
      };
      const exists = prev.c4.components.some(
        (item) => item.id === componentWithDefaults.id
      );
      const components = exists
        ? prev.c4.components.map((item) =>
            item.id === componentWithDefaults.id
              ? { ...item, ...componentWithDefaults }
              : item
          )
        : [...prev.c4.components, componentWithDefaults];

      return {
        ...prev,
        c4: {
          ...prev.c4,
          components
        },
        meta: touchMeta(prev.meta)
      };
    });
  }, [setState]);

  const removeC4Component = useCallback((componentId) => {
    setState((prev) => {
      const components = prev.c4.components.filter(
        (component) => component.id !== componentId
      );
      const adrs = prev.adrs.map((adr) => ({
        ...adr,
        links: {
          ...adr.links,
          c4: adr.links.c4.filter((id) => id !== componentId)
        }
      }));
      const bdd = prev.bdd.map((feature) => ({
        ...feature,
        linkedComponents: feature.linkedComponents.filter(
          (id) => id !== componentId
        )
      }));

      return {
        ...prev,
        c4: {
          ...prev.c4,
          components
        },
        adrs,
        bdd,
        meta: touchMeta(prev.meta)
      };
    });
  }, [setState]);

  const importWorkspace = useCallback((workspace) => {
    setState(() => ({
      ...initialData,
      ...workspace,
      meta: touchMeta(workspace?.meta || initialData.meta)
    }));
  }, [setState]);

  const resetWorkspace = useCallback(() => {
    setState(() => ({
      ...initialData,
      meta: touchMeta(initialData.meta)
    }));
  }, [setState]);

  const actions = useMemo(
    () => ({
      updateChapter,
      addAdr,
      updateAdr,
      removeAdr,
      addFeature,
      updateFeature,
      removeFeature,
      updateC4,
      upsertC4Container,
      removeC4Container,
      upsertC4Component,
      removeC4Component,
      importWorkspace,
      resetWorkspace
    }),
    [
      updateChapter,
      addAdr,
      updateAdr,
      removeAdr,
      addFeature,
      updateFeature,
      removeFeature,
      updateC4,
      upsertC4Container,
      removeC4Container,
      upsertC4Component,
      removeC4Component,
      importWorkspace,
      resetWorkspace
    ]
  );

  return (
    <DataContext.Provider value={state}>
      <ActionsContext.Provider value={actions}>
        {children}
      </ActionsContext.Provider>
    </DataContext.Provider>
  );
}

export function useAppData() {
  return useContext(DataContext);
}

export function useAppActions() {
  return useContext(ActionsContext);
}
