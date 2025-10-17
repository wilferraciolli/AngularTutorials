// Interface for the model (simulating IModelInstance)
import { ResultCode } from './result-code.constant';

export interface IModel {
  attributes: {
    resultCode: ResultCode;
    data?: string; // Optional data for non-pending results
  };
}
