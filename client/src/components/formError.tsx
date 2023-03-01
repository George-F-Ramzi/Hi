interface Prop {
  error: string;
}

function FormError({ error }: Prop) {
  return (
    <div className="h-[48px] mt-4 p-2 bg-red-500 text-white rounded">
      {error}
    </div>
  );
}

export default FormError;
