import React from 'react'
import './GeneralOverview.css'

function GeneralOverview() {
  return (
    <div className="general-overview">
      <h2 className="overview-title">General Overview</h2>
      
      <div className="procedure-section">
        <h3 className="procedure-title">Procedure Overview: Smart Mapping</h3>
        <p className="procedure-description">
          The Smart Mapping procedure facilitates comprehensive mapping between source system (NELMR) and Target Neutral, 
          focusing on identifying matching fields. The process unfolds in the following steps:
        </p>

        <div className="steps-list">
          <div className="step-item">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4 className="step-title">NELMR to Target Neutral Mapping</h4>
              <p className="step-description">
                Conducted to identify corresponding fields between the source (NELMR) and the target system (Target Neutral).
              </p>
            </div>
          </div>

          <div className="step-item">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4 className="step-title">Extraction of Bread Output</h4>
              <p className="step-description">
                Multiple COBOL programs are analyzed to extract input, output, and intermediate data, along with pertinent 
                conditions from code snippets.
              </p>
            </div>
          </div>

          <div className="step-item">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4 className="step-title">Analysis of COBOL Program Interaction</h4>
              <p className="step-description">
                Extraction of call interactions among multiple COBOL programs is performed to delineate the sequence of operations.
              </p>
            </div>
          </div>

          <div className="step-item">
            <div className="step-number">4</div>
            <div className="step-content">
              <h4 className="step-title">Comparison and Consolidation</h4>
              <p className="step-description">
                The results from step 3 are consolidated and compared with the mappings established in step 1. 
                This comparison facilitates the identification of end-to-end mappings from NELMR to Target Neutral and 
                the operations occurring in between.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GeneralOverview

