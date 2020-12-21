import StepModel from '../models/Step';
import _enum from '../utils/enum';

const verifyStep = async (req, res, next) => {
  const { token, url } = req;
  const userStep = await StepModel.findOne({ user: token._id });
  const steps = _enum.steps;
  const path = url.split('/')[1];

  const currentStepIndex = steps.indexOf(userStep.step);
  const acceptSteps = steps.slice(0, currentStepIndex + 1);

  if (!acceptSteps.includes(path)) {
    return res.status(403).json({ err: `your current step is ${userStep.step} go to /api/v1/user/${userStep.step}` });
  }

  return next();
}

export default verifyStep;