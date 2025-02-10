import { Modal } from "@mantine/core";

const SignUpModal: React.FC<{
  children: React.ReactNode;
  opened: boolean;
  close: () => void;
}> = ({ children, opened, close }) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Excited to start a journey with you!"
      className="font-raleway !dark:bg-dark-600"
      styles={{
        title: {
          fontWeight: "bold",
          fontSize: "20px",
        },
      }}
    >
      {children}
    </Modal>
  );
};

export default SignUpModal;
