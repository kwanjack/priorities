import Select from 'react-select';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faTrash } from '@fortawesome/free-solid-svg-icons';
import { removePriorityById } from '../mock_api/models'

// react-select has its own preferred way for styling.
let customStyles = {      
  control: (base, state) => ({
    ...base,
    background: "#f0bb39",
    border: state.isFocused ? 0 : 0,
    // This line disable the blue border
    boxShadow: state.isFocused ? 0 : 0,
    '&:hover': { border: state.isFocused ? 0 : 0 },
    height: '54px',
    'minHeight': '54px',
    'borderRadius': '0px',
    fontFamily: "Arial",
    fontSize: '20px',
    'fontWeight': 700,
    flex: 1,
  }),
  singleValue: (provided, state) => { return { ...provided, fontWeight: 900, color: 'black' }; }
};

let selectStyle = <style jsx="true">{`
.select-wrapper {
  position: absolute;
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100px;
  right: 0;
  top: 80px;
  align-items: center;
}

.select { flex: 1 }

.select-label {
  display: flex;
  height: 54px;
  width: 100px;
  padding: 0px;
  margin: 0px;
  background-color: #6d695f;
  font-size: 20px;
  font-weight: 700;
  align-items: center;
  justify-content: center;
}

.remove-priority:hover { color: red; }

.option-container {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.react-select__single-value .priority-option {
  visibility: hidden;
}
`}</style>;


const PrioritySelect = props => {
  let { priorities, pickedPriorityId, setPickedPriorityId } = props;
  let options = priorities.map(priority => ({ value: priority.id,  label: priority.name }));
  let picked = options.find(option => option.value === pickedPriorityId) || null;

  const formatOptionLabel = ({ value, label, customAbbreviation }) => (
    <div className="option-container">
      <div>{label}</div>
      <div className="priority-option">
        {customAbbreviation} 
        <div className="remove-priority" onClick={((e) => {
          e.stopPropagation();
          let newPriorities = removePriorityById(value);
          if (newPriorities.length === 0) { return setPickedPriorityId(null); }
          if (newPriorities.findIndex(p => p.id === pickedPriorityId) === -1) { setPickedPriorityId(newPriorities[0].id); }
        })}> <FontAwesomeIcon icon={faTrash} /> </div>
      </div>
    </div>
  );
  
  return <div className="select-wrapper">
    <div className="select-label"> Sort by: </div>
    <Select className="select" instanceId="selectPriority" classNamePrefix="react-select"
      value={picked}
      onChange={(selected) => setPickedPriorityId(selected.value)}
      formatOptionLabel={formatOptionLabel}
      options={options}
      components={{ IndicatorSeparator: () => null }}
      styles={customStyles}
    />
    {selectStyle}
  </div>;
};
  
export default PrioritySelect;