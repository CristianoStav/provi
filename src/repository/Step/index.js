import StepModel from '../../models/Step';
import _enum from '../../utils/enum';

const updateByUser = async (userId, value) => {
  const currentUserStep = await StepModel.findOne({ user: userId });
  const steps = _enum.steps;
  const currentUserStepIndex = steps.indexOf(currentUserStep.step);
  const updateStepIndex = steps.indexOf(value);

  if (currentUserStepIndex < updateStepIndex) {
    return StepModel.findOneAndUpdate(
      { user: userId },
      { $set: { step: value } },
      { new: true }
    );
  } else {
    return currentUserStep;
  }
};

export { updateByUser };