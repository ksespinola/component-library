import React, { PropTypes } from 'react';
import composeStyles from '../../../shared/stylesheetComposer';

import baseStyles from './BulkEditor.scss';

let styles = {};

const keyGen = (item, valueField) => (
  valueField ? item[valueField] : item
);

const onSubmit = ({ items, valueField, callback }) => {
  const ids = items.map(item => item[valueField]);

  const inputValues = [];
  Array.prototype.forEach.call(
    document.querySelectorAll('#batch-editor-fields input[type="hidden"]'),
    (input) => {
      if (input.value.length > 0) {
        inputValues[input.name] = input.value;
      }
    }
  );

  callback({ ids, fields: inputValues });
};

// TODO: Button click handlers, will have to deal with table(?)

const BulkEditor = ({
  callback,
  cancelText,
  children,
  itemFormatter,
  items,
  itemsTitle,
  onCancel,
  onRemove,
  stylesheets,
  submitText,
  valueField
}) => {
  styles = composeStyles(baseStyles, stylesheets);

  return (
    <div className={styles.container}>
      <span className={styles.itemsTitle}>{itemsTitle}</span>

      <div className={styles.subContainer}>
        <div className={styles.selectedItems}>
          <div className={`${styles.container} ${styles.itemsContainer}`}>
            {items.map(item =>
              <div className={styles.itemContainer} key={`bulk-editor-item-${keyGen(item, valueField)}`}>
                <button type='button' className={`fa fa-times ${styles.removeButton}`} onClick={() => onRemove(item)} />
                {itemFormatter(item)}
              </div>
            )}
          </div>
        </div>

        <div className={styles.fields} id='batch-editor-fields'>
          <div className={styles.fieldsContainer}>
            {children}
            <span className={styles.footer}>
              <a className={styles.cancel} onClick={onCancel}>{cancelText}</a>
              <button type='button' className={styles.submitButton} onClick={() => onSubmit({ callback, items, valueField })}>
                {submitText}
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

BulkEditor.propTypes = {
  callback: PropTypes.func,
  cancelText: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.any]),
  itemFormatter: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.any])),
  itemsTitle: PropTypes.string,
  onCancel: PropTypes.func,
  onRemove: PropTypes.func,
  stylesheets: PropTypes.arrayOf(PropTypes.shape()),
  submitText: PropTypes.string,
  valueField: PropTypes.string
};

BulkEditor.defaultProps = {
  callback: () => console.log('No callback was passed to Bulk Editor'), // eslint-disable-line
  cancelText: 'Cancel',
  children: [],
  itemFormatter: item => item,
  items: [],
  itemsTitle: 'Selected Items: ',
  onCancel: () => console.log('No onCancel was passed to BulkEditor'), // eslint-disable-line
  onRemove: () => console.log('No on Remove was passed to BulkEditor'), // eslint-disable-line
  stylesheets: [],
  submitText: 'Update',
  valueField: null
};

export default BulkEditor;
