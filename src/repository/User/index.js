import UserModel from '../../models/User';

const updateById = async (_id, values) => {
  return UserModel.findOneAndUpdate(
    { _id },
    { $set: { ...values } },
    { new: true }
  );
};

const findById = async (_id) => {
  return UserModel.findOne({ _id }).lean();
}

export { updateById, findById };