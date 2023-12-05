//
//  StudentSelectMenu.swift
//  Scooper
//
//  Created by Ryheem Heard on 12/2/23.
//

import SwiftUI

struct StudentSelectMenu: View {
    
    @StateObject var vm: ScooperViewModel = ScooperViewModel()
    
    var body: some View {
        
        List {
            ForEach(vm.familyStatus) { student in
                NavigationLink {
                    SchedulingView(id: student.id, student: student.name)
                } label: {
                    Text(student.name)
                }
            }
        }
        .navigationTitle("Select Student")
        .navigationBarTitleDisplayMode(.large)
        .onAppear {
            Task {
                do {
                    try await vm.getChilren()
                } catch {
                    print(error)
                }
            }
        }
    }
}

#Preview {
    StudentSelectMenu()
}
