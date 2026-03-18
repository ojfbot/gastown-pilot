import React, { useState } from 'react';
import { Tile, Tag } from '@carbon/react';
import { useFormulas } from '../../hooks/useFormulas';
import type { FormulaDefinition } from '@ojfbot/gastown-pilot-shared';

/** FormulasView — formula library (left) + MoleculeDAG (right) */
export default function FormulasView() {
  const { data, isLoading } = useFormulas();
  const formulas = data?.formulas ?? [];
  const [selected, setSelected] = useState<FormulaDefinition | null>(null);

  return (
    <div className="gastown-formulas-view">
      <div className="gastown-formulas-library">
        <Tile className="gastown-panel">
          <h4 className="gastown-panel-title">Formula Library</h4>
          {isLoading ? (
            <p className="gastown-panel-loading">Connecting to data source...</p>
          ) : (
            <ul className="gastown-formula-list">
              {formulas.map((formula) => (
                <li
                  key={formula.name}
                  className={`gastown-formula-item ${selected?.name === formula.name ? 'selected' : ''}`}
                  onClick={() => setSelected(formula)}
                >
                  <div className="gastown-formula-header">
                    <strong>{formula.name}</strong>
                    <Tag size="sm">{formula.type}</Tag>
                  </div>
                  <p className="gastown-formula-desc">{formula.description}</p>
                  <span className="gastown-formula-steps">{formula.steps.length} steps</span>
                </li>
              ))}
            </ul>
          )}
        </Tile>
      </div>
      <div className="gastown-formulas-dag">
        <Tile className="gastown-panel">
          <h4 className="gastown-panel-title">Molecule DAG</h4>
          {selected ? (
            <div className="gastown-dag-placeholder">
              <p><strong>{selected.name}</strong> — {selected.steps.length} steps</p>
              <ul>
                {selected.steps.map((step) => (
                  <li key={step.id}>
                    {step.id}: {step.title}
                    {step.needs.length > 0 && ` (needs: ${step.needs.join(', ')})`}
                  </li>
                ))}
              </ul>
              <p className="gastown-panel-empty">
                DAG visualization deferred to Phase 2 (dagre-d3 or @visx/hierarchy)
              </p>
            </div>
          ) : (
            <p className="gastown-panel-empty">Select a formula to view its step graph</p>
          )}
        </Tile>
      </div>
    </div>
  );
}
