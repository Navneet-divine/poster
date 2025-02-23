import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";

const LoginModal: React.FC<{
  children: React.ReactNode;
  opened: boolean;
  close: () => void;
}> = ({ children, opened, close }) => {
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Excited to see you again!"
        className="font-raleway"
        classNames={{
          content: "dark:bg-dark-700",
          header: "dark:bg-dark-700",
          close: "dark:text-dark-100 hover:bg-dark-700",
          title: "dark:text-dark-50",
        }}
        styles={{
          title: {
            fontWeight: "bold",
            fontSize: "22px",
          },
        }}
      >
        {children}
      </Modal>
    </>
  );
};

export default LoginModal;
