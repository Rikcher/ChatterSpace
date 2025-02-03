import { create } from 'zustand';
import { MemberWithProfile } from '@types';

interface MembersState {
  members: MemberWithProfile[];
  setMembers: (members: MemberWithProfile[]) => void;
  addMember: (member: MemberWithProfile) => void;
  removeMember: (memberId: string) => void;
  updateMember: (member: MemberWithProfile) => void;
}

const useMembersStore = create<MembersState>((set) => ({
  members: [],
  setMembers: (members) => set({ members }),
  addMember: (member) =>
    set((state) => ({ members: [...state.members, member] })),
  removeMember: (memberId) =>
    set((state) => ({
      members: state.members.filter((member) => member.id !== memberId),
    })),
  updateMember: (member) =>
    set((state) => ({
      members: state.members.map((individualMember) =>
        individualMember.id === member.id
          ? { ...individualMember, ...member }
          : individualMember
      ),
    })),
}));

export default useMembersStore;
