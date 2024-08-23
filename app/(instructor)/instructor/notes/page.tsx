import CreateNoteForm from "../../../../components/notes/create-notes";

const CreateNotePage = async () => {
  return (
    <div>
      <CreateNoteForm notes={{
        id: "",
        title: "",
        description: "",
        imageUrl: null,
      }}       
      />
    </div>
  );
};

export default CreateNotePage;
