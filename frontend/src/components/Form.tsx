import React from 'react';
import { ReactNode } from 'react';
import { useForm, UseFormRegister, FieldErrors } from 'react-hook-form';

interface FormProps<T> {
  children: ReactNode;
  onSubmit: (data: T) => void;
  title: string;
  isLoading?: boolean;
  error?: string | null;
  onCancel: () => void;
  className?: string;
}

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  required?: boolean;
  className?: string;
}

export function FormField({
  label,
  name,
  type = 'text',
  register,
  errors,
  required = false,
  className = '',
}: FormFieldProps) {
  return (
    <div className={className}>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        type={type}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          errors[name] ? 'border-red-500' : ''
        }`}
        {...register(name, { required: required ? `${label} is required` : false })}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs italic mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}

export const Form: React.FC<FormProps<any>> = ({
  children,
  onSubmit,
  title,
  isLoading = false,
  error = null,
  onCancel,
  className = '',
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  return (
    <div className={`bg-white shadow sm:rounded-lg ${className}`}>
      <div className="px-4 py-5 sm:p-6">
        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className={`space-y-6 ${className}`}>
          {children}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};